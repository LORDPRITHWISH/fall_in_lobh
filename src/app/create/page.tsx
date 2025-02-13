"use client";
import { TemplatePreview } from "@/components/template-preview";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  moods: z.array(z.string().min(1, "Mood cannot be empty")),
  messages: z.array(z.string().min(1, "Phrase cannot be empty")),
  noButtonMessages: z.array(z.string().min(1, "Phrase cannot be empty")),
  celebrationMediaUrl: z.string().url("Please enter a valid URL"),
  celebrationMessage: z.string().min(1, "Message cannot be empty"),
  subdomain: z.string().min(1, "subdomain cannot be empty"),
  domain: z.string().min(1, "domain cannot be empty"),
});

const generateRandomSubdomain = () => {
  return Math.random().toString(36).substring(2, 7);
};

const CreateWebPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "1";
  const [template, setTemplate] = useState<z.infer<typeof formSchema>>({
    title: "",
    moods: [],
    messages: [],
    noButtonMessages: [],
    celebrationMediaUrl: "",
    celebrationMessage: "",
    subdomain: generateRandomSubdomain(),
    domain: "zenux.live",
  });

  useEffect(() => {
    getTemplateDetails();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      moods: [""],
      messages: [""],
      noButtonMessages: [""],
      celebrationMediaUrl: "",
      celebrationMessage: "",
      subdomain: generateRandomSubdomain(),
      domain: "zenux.live",
    },
  });

  const formValues = useWatch({
    control: form.control,
  });

  const getTemplateDetails = async () => {
    try {
      const response = await axios.get(`/api/website?query=${templateId}`);
      console.log(response.data.website);
      setTemplate({
        title: response.data.website.title,
        moods: response.data.website.moods,
        messages: response.data.website.messages,
        noButtonMessages: response.data.website.noButtonMessages,
        celebrationMediaUrl: response.data.website.celebrationMediaUrl,
        celebrationMessage: response.data.website.celebrationMessage,
      });
      form.reset({
        title: response.data.website.title,
        moods: response.data.website.moods,
        messages: response.data.website.messages,
        noButtonMessages: response.data.website.noButtonMessages,
        celebrationMediaUrl: response.data.website.celebrationMediaUrl,
        celebrationMessage: response.data.website.celebrationMessage,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "something went wrong",
      });
    }
  };
  useEffect(() => {
    if (formValues) {
      console.log(formValues);
      setTemplate(formValues);
      console.log(template);
    }
  }, [formValues, setTemplate]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    try {
      const response = await axios.post("/api/website", {
        ...values,
        webUrl: `https://${values.subdomain}.${values.domain}`,
      });
      toast({
        title: "contgratulations",
        description: "website created successfully",
      });
      setTimeout(() => {
        router.push(`/preview?url=${response.data.createWebsite.webUrl}`);
      }, 2000);
      setIsLoading(false);
    } catch (error: any) {
      console.log("Error creating website:", error.response.data.error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "something went wrong",
      });
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Create Valentine Page for your loved one 🥰
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 p-6 bg-pink-50 rounded-lg">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Create Valentine Page
              </h2>
              <p className="text-gray-600">
                Start creating your personalized valentine page here. Be
                creative!
              </p>
            </div>

            <Card className="p-4 space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name of ur special one</FormLabel>
                          <FormControl>
                            <Input placeholder="Romeo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <h3 className="font-semibold">Moods</h3>
                    {form.watch("moods").map((_, index) => (
                      <FormField
                        key={index}
                        control={form.control}
                        name={`moods.${index}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input placeholder="Enter mood..." {...field} />
                                <Button
                                  onClick={() => {
                                    const newMoods = [
                                      ...form.getValues("moods"),
                                    ];
                                    newMoods.splice(index, 1);
                                    form.setValue("moods", newMoods);
                                  }}
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button
                      onClick={() =>
                        form.setValue("moods", [...form.getValues("moods"), ""])
                      }
                      type="button"
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Mood
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="font-semibold">Messages</h3>
                    {form.watch("messages").map((_, index) => (
                      <FormField
                        key={index}
                        control={form.control}
                        name={`messages.${index}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Enter message..."
                                  {...field}
                                />
                                <Button
                                  onClick={() => {
                                    const newMessages = [
                                      ...form.getValues("messages"),
                                    ];
                                    newMessages.splice(index, 1);
                                    form.setValue("messages", newMessages);
                                  }}
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button
                      onClick={() =>
                        form.setValue("messages", [
                          ...form.getValues("messages"),
                          "",
                        ])
                      }
                      type="button"
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Message
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="font-semibold">No Button Messages</h3>
                    {form.watch("noButtonMessages").map((_, index) => (
                      <FormField
                        key={index}
                        control={form.control}
                        name={`noButtonMessages.${index}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Enter no button message..."
                                  {...field}
                                />
                                <Button
                                  onClick={() => {
                                    const newNoButtonMessages = [
                                      ...form.getValues("noButtonMessages"),
                                    ];
                                    newNoButtonMessages.splice(index, 1);
                                    form.setValue(
                                      "noButtonMessages",
                                      newNoButtonMessages
                                    );
                                  }}
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button
                      onClick={() =>
                        form.setValue("noButtonMessages", [
                          ...form.getValues("noButtonMessages"),
                          "",
                        ])
                      }
                      type="button"
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add No Button Message
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  <FormField
                    control={form.control}
                    name="celebrationMediaUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Celebration Media URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/media.gif"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="celebrationMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Celebration Message</FormLabel>
                        <FormControl>
                          <Input placeholder="Congratulations!" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-3">
                    <FormField
                      control={form.control}
                      name="subdomain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>url</FormLabel>
                          <FormControl>
                            <Input placeholder="Congratulations!" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="domain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>url</FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              placeholder="Congratulations!"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button disabled={isLoading} type="submit" className="w-full">
                    {isLoading && <Loader className="animate-spin" />}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
          <div className="sticky top-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Preview
            </h2>
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
              <TemplatePreview template={template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWebPage;
