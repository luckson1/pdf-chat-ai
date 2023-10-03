import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function UseCases() {
  const useCases = [
    {
      useCase: "Literature Review",
      explanation:
        "Craft your own literature review effortlessly with Chat Paperz. Upload your research papers and get insights that directly contribute to your own analysis.",
    },
    {
      useCase: "Annotated Bibliography",
      explanation:
        "Upload sources, ask 'Chat Paperz, summarize this study’s methodology and conlusion,' and get a ready-to-use annotation.",
    },
    {
      useCase: "Article Review",
      explanation:
        "Skip the tedious reading. Ask, 'What’s the main argument?' and get the info you need for a comprehensive review.",
    },
    {
      useCase: "Article Summary",
      explanation:
        "Instantly generate insightful summaries of academic papers with Chat Paperz.",
    },

    {
      useCase: "Research Paper",
      explanation:
        "Accelerate your research paper writing process. Quickly synthesize and integrate sources with Chat Paperz.",
    },

    {
      useCase: "Reading Technical Papers",
      explanation:
        "Ditch the jargon. Upload and ask, 'Explain the conclusion in simple terms,' to grasp complex papers.",
    },
  ];

  return (
<div className="flex flex-col justify-center items-center w-full">
<h2 className=" text-xl md:text-3xl lg:text-5xl  font-bold tracking-normal leading-loose  h-auto my-16"> Use Cases</h2>
<div className="  max-w-6xl h-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[40vh] gap-5 w-full  mx-auto my-16 ">
      {useCases.map((c, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{c.useCase}</CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">{c.explanation}</CardContent>
        </Card>
      ))}
    </div>
</div>
  );
}
