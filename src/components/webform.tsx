import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Icons } from "./Icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { api } from "@/app/api/_trpc/client";
import FormError from "./form_error";

const schema = z.object({
  url: z.string().nonempty("Field is required").url(),
  formatOption: z.enum(["onlinePDF", "webPage", "youTube"], {
    required_error: "You need to select type of content.",
  }),
});

type FormData = z.infer<typeof schema>;
export default function Webform() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { mutate: addWebPage } = api.documents.addWebDoc.useMutation();
  const { mutate: addOnlinePDF } = api.documents.addWebPDF.useMutation();
  const { mutate: addYT } = api.documents.addYTDoc.useMutation();
  const handleSubitLink = handleSubmit((data) => {
    const urltype = data.formatOption;
    urltype === "onlinePDF"
      ? addOnlinePDF(data)
      : urltype === "webPage"
      ? addWebPage(data)
      : urltype === "youTube"
      ? addYT(data)
      : null;
  });

  return (
    <form
      className="w-full  flex flex-col space-y-4 justify-center items-start"
      onSubmit={(e) => handleSubitLink(e)}
    >
      <Label>Add either YouTube, web page or link to online PDF</Label>
      <Controller
        name="formatOption"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <RadioGroup
            className="grid grid-cols-3 gap-x-4"
            onValueChange={onChange}
            onBlur={onBlur}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="youTube"
                id="youTube"
                checked={value === "youTube"}
              />
              <Label htmlFor="youtube">
                <Icons.youtube className="w-7 h-7" />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="webPage"
                id="webPage"
                checked={value === "webPage"}
              />
              <Label htmlFor="webPage">
                <Icons.website className="w-7 h-7" />{" "}
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="onlinePDF"
                id="onlinePDF"
                checked={value === "onlinePDF"}
              />
              <Label htmlFor="onlinePdf">
                <Icons.pdf className="w-7 h-7" />
              </Label>
            </div>
          </RadioGroup>
        )}
      />
      {errors?.formatOption?.message && (
        <FormError error={errors.formatOption.message} />
      )}
      <Label>Paste Link</Label>
      <Input
        className="w-full max-w-sm md:max-w-sm"
        placeholder="https://..."
        {...register("url")}
      />
      {errors?.url?.message && <FormError error={errors.url.message} />}
      <Button className="w-full max-w-sm sm:max-w-sm ">Add Link</Button>
    </form>
  );
}
