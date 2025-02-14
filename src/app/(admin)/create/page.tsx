"use client";
import { TemplatePreview } from "@/components/template-preview";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Spinner from "@/components/spinner/Spinner";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const EMOJI_OPTIONS = [
  { label: "superHappy", imoji: "🥰", value: "superHappy" },
  { label: "happy", imoji: "😊", value: "happy" },
  { label: "excited", imoji: "😍", value: "excited" },
  { label: "hopeful", imoji: "🤗", value: "hopeful" },
  { label: "nervous", imoji: "😅", value: "nervous" },
  { label: "question", imoji: "🤔", value: "question" },
  { label: "inocent", imoji: "😇", value: "inocent" },
  { label: "excited2", imoji: "🥳", value: "excited2" },
  { label: "horny", imoji: "😏", value: "horny" },
  { label: "heart", imoji: "❤️", value: "heart" },
  { label: "sad1", imoji: "😕", value: "sad1" },
  { label: "sad2", imoji: "😢", value: "sad2" },
  { label: "sad3", imoji: "😭", value: "sad3" },
  { label: "sad4", imoji: "🥺", value: "sad4" },
  { label: "celebration", imoji: "🤩", value: "celebration" },
];

const MessageWithMood = ({ messageIndex, control, onRemove }: { messageIndex: number; control: any; onRemove: () => void }) => {
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <FormField
          control={control}
          name={`messages.${messageIndex}`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter message..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-15">
        <FormField
          control={control}
          name={`moods.${messageIndex}`}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Mood" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EMOJI_OPTIONS.map((emoji) => (
                    <SelectItem className="text-center" key={emoji.value} value={emoji.value}>
                      {emoji.imoji}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button onClick={onRemove} type="button" variant="destructive" size="icon" className="w-6 h-6 self-center">
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

const CreateWebPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [formLoader, setFormLoader] = useState(false);
  const [templateLoader, setTemplateLoader] = useState(false);
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
    domain: "myvalentine.live",
  });

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
      domain: "myvalentine.live",
    },
  });

  const formValues = useWatch({
    control: form.control,
  });

  const getTemplateDetails = async () => {
    setTemplateLoader(true);
    try {
      const response = await axios.get(`/api/website?query=${templateId}`);
      setTemplate({
        title: response.data.website.title,
        moods: response.data.website.moods,
        messages: response.data.website.messages,
        noButtonMessages: response.data.website.noButtonMessages,
        celebrationMediaUrl: response.data.website.celebrationMediaUrl,
        celebrationMessage: response.data.website.celebrationMessage,
        subdomain: generateRandomSubdomain(),
        domain: "myvalentine.live",
      });
      form.reset({
        title: response.data.website.title,
        moods: response.data.website.moods,
        messages: response.data.website.messages,
        noButtonMessages: response.data.website.noButtonMessages,
        celebrationMediaUrl: response.data.website.celebrationMediaUrl,
        celebrationMessage: response.data.website.celebrationMessage,
        subdomain: generateRandomSubdomain(),
        domain: "myvalentine.live",
      });
      setTemplateLoader(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
      setTemplateLoader(false);
    }
  };

  useEffect(() => {
    getTemplateDetails();
  }, []);

  useEffect(() => {
    if (formValues) {
      setTemplate({
        title: formValues.title || "",
        moods: formValues.moods || [],
        messages: formValues.messages || [],
        noButtonMessages: formValues.noButtonMessages || [],
        celebrationMediaUrl: formValues.celebrationMediaUrl || "",
        celebrationMessage: formValues.celebrationMessage || "",
        subdomain: formValues.subdomain || generateRandomSubdomain(),
        domain: "myvalentine.live",
      });
    }
  }, [formValues]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoader(true);
    try {
      const response = await axios.post("/api/website", {
        ...values,
        webUrl: `https://${values.subdomain}.${values.domain}`,
      });
      toast({
        title: "Congratulations",
        description: "Website created successfully",
      });
      setTimeout(() => {
        router.push(`/preview?url=${response.data.createWebsite.webUrl}`);
      }, 2000);
      setFormLoader(false);
    } catch (error: any) {
      console.log("Error creating website:", error.response.data.error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
      setFormLoader(false);
    }
  };

  if (templateLoader) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-xl md:text-4xl font-bold text-gray-900 m-1 md:m-8 text-center">Create Valentine Page for your loved one 🥰</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 p-1 md:p-6 bg-pink-50 rounded-lg">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Create Valentine Page</h2>
              <p className="text-gray-600">Start creating your personalized valentine page here. Be creative!</p>
            </div>

            <Card className="p-2 md:p-4 space-y-4">
              <ScrollArea className="rounded-md h-full md:h-[500px] p-4">
                <div className="mb-14">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name of your special one</FormLabel>
                              <FormControl>
                                <Input placeholder="Romeo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="space-y-4">
                          <h3 className="font-semibold">Messages</h3>
                          {form.watch("messages").map((_, index) => (
                            <MessageWithMood
                              key={index}
                              messageIndex={index}
                              control={form.control}
                              onRemove={() => {
                                const newMessages = [...form.getValues("messages")];
                                const newMoods = [...form.getValues("moods")];
                                newMessages.splice(index, 1);
                                newMoods.splice(index, 1);
                                form.setValue("messages", newMessages);
                                form.setValue("moods", newMoods);
                              }}
                            />
                          ))}
                          <Button
                            onClick={() => {
                              form.setValue("messages", [...form.getValues("messages"), ""]);
                              form.setValue("moods", [...form.getValues("moods"), ""]);
                            }}
                            type="button"
                            size="sm"
                            variant="outline"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Message
                          </Button>
                        </div>
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
                                    <Input placeholder="Enter no button message..." {...field} />
                                    <Button
                                      onClick={() => {
                                        const newNoButtonMessages = [...form.getValues("noButtonMessages")];
                                        newNoButtonMessages.splice(index, 1);
                                        form.setValue("noButtonMessages", newNoButtonMessages);
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
                        <Button onClick={() => form.setValue("noButtonMessages", [...form.getValues("noButtonMessages"), ""])} type="button" size="sm" variant="outline">
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
                              <Input placeholder="https://example.com/media.gif" {...field} />
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
                              <FormLabel>Prefix</FormLabel>
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
                            <FormItem className="self-center">
                              <FormLabel>Domain</FormLabel>
                              <FormControl>
                                <Input disabled placeholder="Congratulations!" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button disabled={formLoader} type="submit" className="max-w-full absolute bottom-4 left-4" style={{ width: "calc(100% - 2rem)" }}>
                        {formLoader && <Loader className="animate-spin" />}
                        Create
                      </Button>
                    </form>
                  </Form>
                </div>
              </ScrollArea>
            </Card>
          </div>
          <div className="sticky top-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Preview</h2>
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
              <TemplatePreview template={template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense>
      <CreateWebPage />
    </Suspense>
  );
};

export default Page;
