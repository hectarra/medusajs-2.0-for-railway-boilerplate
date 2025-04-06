"use client";
import { ComponentProps } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react"; 
import { builder } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";

type BuilderPageProps = ComponentProps<typeof BuilderComponent>;

// Replace with your Builder.io Public API Key
builder.init("e2681541300e4e2d84c04a77559a707c");

export function RenderBuilderContent(props: BuilderPageProps) { 
  const isPreviewing = useIsPreviewing(); 

  return props.content || isPreviewing ? (
    <BuilderComponent {...props} />
  ) : (
    <DefaultErrorPage statusCode={404} />
  );
}