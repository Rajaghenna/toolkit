"use client";
import EmptyState from "@/components/main/EmptyState";
import { useEffect } from "react";


interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <EmptyState title="uh ohh" subtitle="Something Went Wrong?????" />;
};

export default ErrorState;
