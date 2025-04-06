"use client";
import { ComponentProps } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react"; 
import { builder } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";

type BuilderPageProps = ComponentProps<typeof BuilderComponent>;

// Replace with your Builder.io Public API Key
builder.init("70960fd039784ac08e7a9e0355f38349");

export function RenderBuilderContent(props: BuilderPageProps) { 
  const isPreviewing = useIsPreviewing(); 

  return props.content || isPreviewing ? (
    <BuilderComponent {...props} />
  ) : (
    <DefaultErrorPage statusCode={404} />
  );
}