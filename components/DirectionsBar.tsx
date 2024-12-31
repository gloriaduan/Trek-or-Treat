import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function DirectionsBar() {
  return (
    <aside className="directions-bar bg-black md:max-w-xs w-full md:h-full-height h-52 p-3 md:py-10 md:px-5">
      <ScrollArea className="h-full rounded-md p-3">
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="address">Choose a starting point:</Label>
          <Input type="text" id="address" placeholder="Starting point" />
        </div>
      </ScrollArea>
    </aside>
  );
}

export default DirectionsBar;
