import { Grid2X2 } from "lucide-react";

export default function Title() {
  return (
    <div
      className="flex items-center gap-3 p-4"
      style={{
        width: "1176px",
        height: "84px",
        top: "108px",
        left: "264px",
      }}
    >
      <div className="flex items-center justify-center rounded-full bg-[#253bff] p-2 text-white">
        <Grid2X2 className="h-5 w-5" />
      </div>
      <h1 className="text-3xl font-bold text-[#101828]">Menus</h1>
    </div>
  );
}
