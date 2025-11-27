// TopProducts.tsx
import { useEffect, useState } from "react";
import { Rating, Tooltip, Chip, IconButton } from "@mui/material";
import StarRounded from "@mui/icons-material/StarRounded";
import StarBorderRounded from "@mui/icons-material/StarBorderRounded";
import AddShoppingCartRounded from "@mui/icons-material/AddShoppingCartRounded";
import ShoppingBagRounded from "@mui/icons-material/ShoppingBagRounded";
import PhoneIphoneRounded from "@mui/icons-material/PhoneIphoneRounded";
import ImageNotSupportedRounded from "@mui/icons-material/ImageNotSupportedRounded";

type Item = {
  id: number;
  name: string;
  price: string;
  rating?: number;
  reviews?: number;
  img?: string;
  tags?: string[];
};

const ITEMS: Item[] = [
  { id: 1, name: "NIKE Shoes Black Pattern", price: "$87", rating: 3.5, reviews: 128, img: "", tags: ["Shoes", "Men"] },
  { id: 2, name: "iPhone 12",               price: "$987", rating: 5,   reviews: 342, img: "", tags: ["Phone", "Electronics"] },
];

// ⬇️ 이미지 없을 때 보여줄 아이콘 선택 로직
function pickIcon(it: Item) {
  const name = it.name.toLowerCase();
  const has = (s: string) => it.tags?.some(t => t.toLowerCase() === s.toLowerCase()) || name.includes(s.toLowerCase());

  if (has("phone") || has("iphone")) {
    return <PhoneIphoneRounded sx={{ color: "primary.main", fontSize: 22 }} />;
  }
  if (has("shoe") || has("shoes")) {
    return <ShoppingBagRounded sx={{ color: "primary.main", fontSize: 22 }} />;
  }
  return <ImageNotSupportedRounded sx={{ color: "text.secondary", fontSize: 22 }} />;
}

export default function TopProducts() {
  const [ratings, setRatings] = useState<Record<number, number>>(
    Object.fromEntries(ITEMS.map((it) => [it.id, it.rating ?? 0]))
  );
  const [hover, setHover] = useState<Record<number, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem("topProducts:ratings");
    if (saved) setRatings(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("topProducts:ratings", JSON.stringify(ratings));
  }, [ratings]);

  return (
    <div className="bg-paper rounded-2xl shadow-card p-4">
      <h3 className="font-bold mb-3">Top selling Products</h3>

      <div className="space-y-4">
        {ITEMS.map((it) => {
          const value = ratings[it.id] ?? 0;
          const active = hover[it.id];
          const display = typeof active === "number" && active >= 0 ? active : value;

          return (
            <div key={it.id} className="flex items-center gap-3">
              {/* 썸네일 (이미지 없으면 아이콘 대체) */}
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-tile grid place-items-center shrink-0">
                {it.img ? (
                  <img src={it.img} alt={`${it.name} thumbnail`} className="w-full h-full object-cover" />
                ) : (
                  pickIcon(it)
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-medium leading-snug truncate">{it.name}</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {it.tags?.map((t, idx) => (
                        <Chip key={idx} size="small" label={t} variant="outlined"
                              sx={{ height: 20, "& .MuiChip-label": { px: 0.75 } }} />
                      ))}
                    </div>
                  </div>
                  <div className="font-semibold whitespace-nowrap">{it.price}</div>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <Tooltip title={`${display.toFixed(1)}점`} arrow>
                    <Rating
                      value={value}
                      precision={0.5}
                      onChange={(_, v) => setRatings(p => ({ ...p, [it.id]: v ?? p[it.id] ?? 0 }))}
                      onChangeActive={(_, v) => setHover(p => ({ ...p, [it.id]: v ?? -1 }))}
                      size="small"
                      icon={<StarRounded fontSize="inherit" />}
                      emptyIcon={<StarBorderRounded fontSize="inherit" />}
                      sx={{ color: "warning.main" }}
                      getLabelText={(v) => `${v} Stars`}
                      aria-label={`${it.name} rating`}
                    />
                  </Tooltip>
                  <span className="text-xs text-muted">
                    {display.toFixed(1)} {it.reviews ? `(${it.reviews})` : ""}
                  </span>
                </div>
              </div>

              <Tooltip title="Add to cart">
                <IconButton size="small" sx={{ color: "primary.main" }}>
                  <AddShoppingCartRounded fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
}
