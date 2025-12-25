import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

// Disease knowledge base for arecanut
const diseaseKnowledge = `
You are an expert agricultural pathologist specializing in arecanut (betel nut) diseases. Analyze the provided image description and identify any diseases.

Common arecanut diseases to look for:
1. **Koleroga (Mahali/Fruit Rot)**: Black spots on nuts, white fungal growth, premature fruit drop. Caused by Phytophthora during monsoon.
2. **Yellow Leaf Disease (YLD)**: Yellowing of lower leaves, reduced nut size, crown size reduction. Caused by Phytoplasma.
3. **Bud Rot**: Yellowing of spindle leaf, rotting of growing bud, foul smell from crown. Caused by Phytophthora palmivora.
4. **Anaberoga (Inflorescence Dieback)**: Drying of inflorescence, poor nut setting, shriveled nuts.
5. **Basal Stem Rot**: Yellowing of outer leaves, oozing brown liquid from base, bracket-shaped fungal growth.
6. **Spindle Bug Damage**: Yellow streaks on leaves, leaf tip drying.
7. **Mite Damage**: Bronze discoloration, fine webbing on leaves.
8. **Root Grub Damage**: Wilting despite irrigation, yellowing of fronds.

For each identified issue, provide:
- Disease/Pest name
- Severity (low/medium/high/critical)
- Confidence percentage
- Visible symptoms observed
- Causes
- Recommended treatment steps
- Prevention measures

If the image doesn't show arecanut or any disease, mention that clearly.
Respond in JSON format only.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, imageDescription } = await req.json();

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing image for disease detection...");

    // Prepare the message for AI analysis
    const userMessage = imageBase64 
      ? `Analyze this arecanut image for diseases. The image is provided as base64. Describe what you see and identify any diseases, pests, or health issues.`
      : `Analyze the following description of an arecanut plant/fruit and identify potential diseases or issues:\n\n${imageDescription || "User uploaded an arecanut image for analysis."}`;

    const messages = [
      { role: "system", content: diseaseKnowledge },
      { role: "user", content: userMessage }
    ];

    // If we have an image, use multimodal
    if (imageBase64) {
      messages[1] = {
        role: "user",
        content: [
          { type: "text", text: "Analyze this arecanut image for diseases, pests, or health issues. Identify the problem and provide treatment recommendations." },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
        ]
      } as any;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_disease",
              description: "Return structured disease analysis results",
              parameters: {
                type: "object",
                properties: {
                  detected: {
                    type: "boolean",
                    description: "Whether a disease or issue was detected"
                  },
                  disease: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      severity: { type: "string", enum: ["low", "medium", "high", "critical"] },
                      confidence: { type: "number", minimum: 0, maximum: 100 },
                      symptoms: {
                        type: "array",
                        items: { type: "string" }
                      },
                      causes: { type: "string" },
                      treatment: {
                        type: "array",
                        items: { type: "string" }
                      },
                      prevention: {
                        type: "array",
                        items: { type: "string" }
                      }
                    },
                    required: ["name", "severity", "confidence", "symptoms", "causes", "treatment", "prevention"]
                  },
                  healthyIndicators: {
                    type: "array",
                    items: { type: "string" }
                  },
                  additionalNotes: { type: "string" }
                },
                required: ["detected"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "analyze_disease" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI analysis failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");

    // Extract the function call result
    let analysisResult;
    if (data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments) {
      analysisResult = JSON.parse(data.choices[0].message.tool_calls[0].function.arguments);
    } else if (data.choices?.[0]?.message?.content) {
      // Fallback: try to parse content directly
      try {
        analysisResult = JSON.parse(data.choices[0].message.content);
      } catch {
        analysisResult = {
          detected: false,
          additionalNotes: data.choices[0].message.content
        };
      }
    } else {
      throw new Error("Invalid AI response format");
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Disease analysis error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Analysis failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
