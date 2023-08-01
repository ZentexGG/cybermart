import { useEffect } from "react";

export default function TitleUpdater({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
    
  return null;
}
