import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function NoData() {
  return (
    <Card className="w-full mx-auto mt-10 shadow-xs">
      <CardContent className="flex flex-col items-center text-center py-6">
        <Info className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground mb-2">No Posts Available</h3>
        <p className="text-sm text-muted-foreground mb-4">No posts have been made yet</p>
      </CardContent>
    </Card>
  );
}
