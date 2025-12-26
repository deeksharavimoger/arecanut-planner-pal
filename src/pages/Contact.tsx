import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, Calendar, Clock, User, MessageSquare, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import { z } from "zod";

// Validation schemas
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

const consultationSchema = z.object({
  farmer_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits"),
  email: z.string().optional(),
  location: z.string().trim().min(2, "Location is required").max(200, "Location must be less than 200 characters"),
  plantation_size: z.string().min(1, "Please select plantation size"),
  issue_type: z.string().min(1, "Please select issue type"),
  issue_description: z.string().trim().min(20, "Please describe your issue in at least 20 characters").max(1000, "Description must be less than 1000 characters"),
  preferred_date: z.string().min(1, "Please select a date"),
  preferred_time: z.string().min(1, "Please select a time slot"),
});

const experts = [
  {
    name: "Dr. Ramesh Kumar",
    specialization: "Plant Pathology & Disease Management",
    experience: "15+ years",
    languages: "Kannada, English, Hindi",
  },
  {
    name: "Dr. Lakshmi Narayana",
    specialization: "Soil Science & Fertilizer Management",
    experience: "12+ years",
    languages: "Kannada, Malayalam, English",
  },
  {
    name: "Shri. Manjunath Hegde",
    specialization: "Pest Control & Organic Farming",
    experience: "20+ years",
    languages: "Kannada, Tulu, Hindi",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [contactLoading, setContactLoading] = useState(false);
  const [consultationLoading, setConsultationLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [consultationSuccess, setConsultationSuccess] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Consultation form state
  const [consultationForm, setConsultationForm] = useState({
    farmer_name: "",
    phone: "",
    email: "",
    location: "",
    plantation_size: "",
    issue_type: "",
    issue_description: "",
    preferred_date: "",
    preferred_time: "",
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validation = contactSchema.safeParse(contactForm);
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setContactLoading(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: contactForm.name.trim(),
        email: contactForm.email.trim(),
        phone: contactForm.phone?.trim() || null,
        subject: contactForm.subject,
        message: contactForm.message.trim(),
      });

      if (error) throw error;

      setContactSuccess(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24-48 hours.",
      });

      // Reset form
      setContactForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Contact submission error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setContactLoading(false);
    }
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validation = consultationSchema.safeParse(consultationForm);
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setConsultationLoading(true);

    try {
      const { error } = await supabase.from("consultation_bookings").insert({
        farmer_name: consultationForm.farmer_name.trim(),
        phone: consultationForm.phone.trim(),
        email: consultationForm.email?.trim() || null,
        location: consultationForm.location.trim(),
        plantation_size: consultationForm.plantation_size,
        issue_type: consultationForm.issue_type,
        issue_description: consultationForm.issue_description.trim(),
        preferred_date: consultationForm.preferred_date,
        preferred_time: consultationForm.preferred_time,
      });

      if (error) throw error;

      setConsultationSuccess(true);
      toast({
        title: "Booking Confirmed!",
        description: "Our expert will call you on the scheduled date and time.",
      });

      // Reset form
      setConsultationForm({
        farmer_name: "",
        phone: "",
        email: "",
        location: "",
        plantation_size: "",
        issue_type: "",
        issue_description: "",
        preferred_date: "",
        preferred_time: "",
      });
    } catch (error: any) {
      console.error("Consultation booking error:", error);
      toast({
        title: "Error",
        description: "Failed to book consultation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConsultationLoading(false);
    }
  };

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <>
      <Helmet>
        <title>Contact & Expert Consultation | ArecaWise</title>
        <meta name="description" content="Get in touch with ArecaWise team or book a consultation with agricultural experts for personalized arecanut farming advice." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Get Help
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Contact Us & Book Expert Consultation
              </h1>
              <p className="text-muted-foreground text-lg">
                Have questions? Our team and expert agricultural consultants are here to help you succeed.
              </p>
            </div>

            {/* Quick Contact Info */}
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                  <a href="mailto:support@arecawise.com" className="text-muted-foreground hover:text-primary transition-colors">
                    support@arecawise.com
                  </a>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                  <a href="tel:+918001234567" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 800-123-4567
                  </a>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
                  <p className="text-muted-foreground text-sm">
                    Agricultural Hub, Mangalore, Karnataka
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for Contact & Consultation */}
            <Tabs defaultValue="contact" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="contact" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Contact Form
                </TabsTrigger>
                <TabsTrigger value="consultation" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Book Consultation
                </TabsTrigger>
              </TabsList>

              {/* Contact Form Tab */}
              <TabsContent value="contact">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Send us a Message</CardTitle>
                        <CardDescription>Fill out the form and we'll get back to you within 24-48 hours.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {contactSuccess ? (
                          <div className="text-center py-8 animate-fade-in">
                            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                              <CheckCircle2 className="w-8 h-8 text-success" />
                            </div>
                            <h3 className="font-semibold text-xl text-foreground mb-2">Message Sent Successfully!</h3>
                            <p className="text-muted-foreground mb-4">Thank you for reaching out. We'll respond soon.</p>
                            <Button variant="outline" onClick={() => setContactSuccess(false)}>
                              Send Another Message
                            </Button>
                          </div>
                        ) : (
                          <form onSubmit={handleContactSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                  id="name"
                                  placeholder="Your name"
                                  value={contactForm.name}
                                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                  required
                                  maxLength={100}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="you@example.com"
                                  value={contactForm.email}
                                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                  required
                                  maxLength={255}
                                />
                              </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                  id="phone"
                                  type="tel"
                                  placeholder="+91 XXXXX XXXXX"
                                  value={contactForm.phone}
                                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                                  maxLength={15}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="subject">Subject *</Label>
                                <Select
                                  value={contactForm.subject}
                                  onValueChange={(value) => setContactForm({ ...contactForm, subject: value })}
                                  required
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a subject" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="general">General Inquiry</SelectItem>
                                    <SelectItem value="disease">Disease Related</SelectItem>
                                    <SelectItem value="pest">Pest Problem</SelectItem>
                                    <SelectItem value="market">Market Prices</SelectItem>
                                    <SelectItem value="technical">Technical Support</SelectItem>
                                    <SelectItem value="feedback">Feedback</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="message">Message *</Label>
                              <Textarea
                                id="message"
                                placeholder="Describe your query in detail..."
                                value={contactForm.message}
                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                required
                                rows={5}
                                maxLength={1000}
                              />
                              <p className="text-xs text-muted-foreground">{contactForm.message.length}/1000 characters</p>
                            </div>
                            <Button type="submit" className="w-full" disabled={contactLoading}>
                              {contactLoading ? "Sending..." : "Send Message"}
                            </Button>
                          </form>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* FAQ */}
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Answers</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground text-sm">How soon will I get a response?</h4>
                          <p className="text-sm text-muted-foreground">Usually within 24-48 hours.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground text-sm">Is the service available in Kannada?</h4>
                          <p className="text-sm text-muted-foreground">Yes! We support Kannada, Malayalam, Hindi, and English.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground text-sm">Is expert consultation free?</h4>
                          <p className="text-sm text-muted-foreground">First consultation is free. Follow-ups may have nominal charges.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Consultation Booking Tab */}
              <TabsContent value="consultation">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          Book Expert Consultation
                        </CardTitle>
                        <CardDescription>
                          Schedule a call with our agricultural experts for personalized advice on your arecanut plantation.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {consultationSuccess ? (
                          <div className="text-center py-8 animate-fade-in">
                            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                              <CheckCircle2 className="w-8 h-8 text-success" />
                            </div>
                            <h3 className="font-semibold text-xl text-foreground mb-2">Consultation Booked!</h3>
                            <p className="text-muted-foreground mb-4">
                              Our expert will call you on your scheduled date and time. Please keep your phone available.
                            </p>
                            <Button variant="outline" onClick={() => setConsultationSuccess(false)}>
                              Book Another Consultation
                            </Button>
                          </div>
                        ) : (
                          <form onSubmit={handleConsultationSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="farmer_name">Your Name *</Label>
                                <Input
                                  id="farmer_name"
                                  placeholder="Full name"
                                  value={consultationForm.farmer_name}
                                  onChange={(e) => setConsultationForm({ ...consultationForm, farmer_name: e.target.value })}
                                  required
                                  maxLength={100}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="consultation_phone">Phone Number *</Label>
                                <Input
                                  id="consultation_phone"
                                  type="tel"
                                  placeholder="+91 XXXXX XXXXX"
                                  value={consultationForm.phone}
                                  onChange={(e) => setConsultationForm({ ...consultationForm, phone: e.target.value })}
                                  required
                                  maxLength={15}
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="consultation_email">Email (Optional)</Label>
                                <Input
                                  id="consultation_email"
                                  type="email"
                                  placeholder="For booking confirmation"
                                  value={consultationForm.email}
                                  onChange={(e) => setConsultationForm({ ...consultationForm, email: e.target.value })}
                                  maxLength={255}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="location">Location/Village *</Label>
                                <Input
                                  id="location"
                                  placeholder="Village, Taluk, District"
                                  value={consultationForm.location}
                                  onChange={(e) => setConsultationForm({ ...consultationForm, location: e.target.value })}
                                  required
                                  maxLength={200}
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="plantation_size">Plantation Size *</Label>
                                <Select
                                  value={consultationForm.plantation_size}
                                  onValueChange={(value) => setConsultationForm({ ...consultationForm, plantation_size: value })}
                                  required
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select size" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="less-1-acre">Less than 1 acre</SelectItem>
                                    <SelectItem value="1-2-acres">1-2 acres</SelectItem>
                                    <SelectItem value="2-5-acres">2-5 acres</SelectItem>
                                    <SelectItem value="5-10-acres">5-10 acres</SelectItem>
                                    <SelectItem value="more-10-acres">More than 10 acres</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="issue_type">Issue Type *</Label>
                                <Select
                                  value={consultationForm.issue_type}
                                  onValueChange={(value) => setConsultationForm({ ...consultationForm, issue_type: value })}
                                  required
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select issue" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="disease">Disease Problem</SelectItem>
                                    <SelectItem value="pest">Pest Infestation</SelectItem>
                                    <SelectItem value="soil">Soil & Fertilizer</SelectItem>
                                    <SelectItem value="irrigation">Irrigation</SelectItem>
                                    <SelectItem value="yield">Low Yield</SelectItem>
                                    <SelectItem value="planting">New Plantation</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="issue_description">Describe Your Issue *</Label>
                              <Textarea
                                id="issue_description"
                                placeholder="Describe the problem you're facing in detail. Include symptoms, duration, area affected, any treatments tried, etc."
                                value={consultationForm.issue_description}
                                onChange={(e) => setConsultationForm({ ...consultationForm, issue_description: e.target.value })}
                                required
                                rows={4}
                                maxLength={1000}
                              />
                              <p className="text-xs text-muted-foreground">{consultationForm.issue_description.length}/1000 characters</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="preferred_date">Preferred Date *</Label>
                                <Input
                                  id="preferred_date"
                                  type="date"
                                  value={consultationForm.preferred_date}
                                  onChange={(e) => setConsultationForm({ ...consultationForm, preferred_date: e.target.value })}
                                  min={minDate}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="preferred_time">Preferred Time *</Label>
                                <Select
                                  value={consultationForm.preferred_time}
                                  onValueChange={(value) => setConsultationForm({ ...consultationForm, preferred_time: value })}
                                  required
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="9-10am">9:00 AM - 10:00 AM</SelectItem>
                                    <SelectItem value="10-11am">10:00 AM - 11:00 AM</SelectItem>
                                    <SelectItem value="11-12pm">11:00 AM - 12:00 PM</SelectItem>
                                    <SelectItem value="2-3pm">2:00 PM - 3:00 PM</SelectItem>
                                    <SelectItem value="3-4pm">3:00 PM - 4:00 PM</SelectItem>
                                    <SelectItem value="4-5pm">4:00 PM - 5:00 PM</SelectItem>
                                    <SelectItem value="5-6pm">5:00 PM - 6:00 PM</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="p-4 rounded-xl bg-muted/50 border border-border">
                              <p className="text-sm text-muted-foreground">
                                <strong>Note:</strong> First consultation is FREE. Our expert will call you on the scheduled date and time. Please keep your phone available.
                              </p>
                            </div>

                            <Button type="submit" variant="hero" className="w-full" disabled={consultationLoading}>
                              {consultationLoading ? "Booking..." : "Book Free Consultation"}
                            </Button>
                          </form>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Experts */}
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-bold text-foreground">Our Experts</h3>
                    {experts.map((expert) => (
                      <Card key={expert.name}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <User className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">{expert.name}</h4>
                              <p className="text-sm text-primary">{expert.specialization}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {expert.experience}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Languages: {expert.languages}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
