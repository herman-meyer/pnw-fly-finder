import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// ============ KNOWLEDGE BASE ============
const DATA = {
  fish: [
    { id: "rainbow_trout", name: "Rainbow Trout", latin: "Oncorhynchus mykiss", water_types: ["river","stream","lake"], diet: ["mayfly","caddisfly","stonefly","midge","terrestrial","sculpin","leech"] },
    { id: "cutthroat_trout", name: "Cutthroat Trout", latin: "Oncorhynchus clarkii", water_types: ["river","stream","saltwater_nearshore"], diet: ["mayfly","caddisfly","terrestrial","baitfish","shrimp","sculpin"] },
    { id: "brown_trout", name: "Brown Trout", latin: "Salmo trutta", water_types: ["river","stream","lake"], diet: ["sculpin","baitfish","mayfly","caddisfly","stonefly","terrestrial","leech","crayfish"] },
    { id: "brook_trout", name: "Brook Trout", latin: "Salvelinus fontinalis", water_types: ["stream","lake"], diet: ["mayfly","caddisfly","terrestrial","midge","small_nymph"] },
    { id: "lake_trout", name: "Lake Trout", latin: "Salvelinus namaycush", water_types: ["lake"], diet: ["sculpin","baitfish","leech"] },
    { id: "winter_steelhead", name: "Steelhead (Winter)", latin: "Oncorhynchus mykiss irideus", water_types: ["river"], diet: ["egg","baitfish","stonefly_nymph","worm"] },
    { id: "summer_steelhead", name: "Steelhead (Summer)", latin: "Oncorhynchus mykiss irideus", water_types: ["river"], diet: ["caddisfly","stonefly","baitfish"] },
    { id: "chinook_salmon", name: "Chinook Salmon", latin: "Oncorhynchus tshawytscha", water_types: ["river","saltwater_nearshore"], diet: ["baitfish","shrimp","egg"] },
    { id: "coho_salmon", name: "Coho Salmon", latin: "Oncorhynchus kisutch", water_types: ["river","saltwater_nearshore"], diet: ["baitfish","shrimp"] },
    { id: "sockeye_salmon", name: "Sockeye Salmon", latin: "Oncorhynchus nerka", water_types: ["river","lake"], diet: ["shrimp","small_nymph","egg"] },
    { id: "pink_salmon", name: "Pink Salmon", latin: "Oncorhynchus gorbuscha", water_types: ["river"], diet: ["baitfish","shrimp"] },
    { id: "chum_salmon", name: "Chum Salmon", latin: "Oncorhynchus keta", water_types: ["river"], diet: ["baitfish","egg","shrimp"] },
    { id: "largemouth_bass", name: "Largemouth Bass", latin: "Micropterus salmoides", water_types: ["lake","pond"], diet: ["frog","baitfish","damselfly","dragonfly","crayfish","mouse"] },
    { id: "smallmouth_bass", name: "Smallmouth Bass", latin: "Micropterus dolomieu", water_types: ["lake","river"], diet: ["crayfish","baitfish","damselfly","dragonfly","hellgrammite","leech"] },
    { id: "walleye", name: "Walleye", latin: "Sander vitreus", water_types: ["lake"], diet: ["baitfish","leech","crayfish"] },
    { id: "yellow_perch", name: "Yellow Perch", latin: "Perca flavescens", water_types: ["lake"], diet: ["small_nymph","baitfish","midge","leech"] },
    { id: "channel_catfish", name: "Channel Catfish", latin: "Ictalurus punctatus", water_types: ["river","lake"], diet: ["baitfish","leech","crayfish","worm","scent_bait"] },
    { id: "bluegill", name: "Bluegill / Panfish", latin: "Lepomis macrochirus", water_types: ["lake","pond"], diet: ["midge","damselfly","terrestrial","small_nymph","worm"] }
  ],

  insects: [
    { id: "mayfly", name: "Mayfly (BWO / PMD / Callibaetis)", hatch_months: [3,4,5,6,9,10] },
    { id: "caddisfly", name: "Caddisfly (Elk Hair / Spotted Sedge)", hatch_months: [5,6,7,8,9] },
    { id: "stonefly", name: "Stonefly (Skwala / Golden Stone / Salmonfly)", hatch_months: [2,3,4,5,6] },
    { id: "stonefly_nymph", name: "Stonefly nymph (subsurface, year-round)", hatch_months: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { id: "midge", name: "Midge", hatch_months: [1,2,3,11,12] },
    { id: "terrestrial", name: "Terrestrial (ants, beetles, hoppers)", hatch_months: [7,8,9] },
    { id: "damselfly", name: "Damselfly", hatch_months: [6,7,8] },
    { id: "dragonfly", name: "Dragonfly", hatch_months: [6,7,8,9] },
    { id: "small_nymph", name: "General small nymph", hatch_months: [1,2,3,4,5,6,7,8,9,10,11,12] }
  ],

  baitfish_other: [
    { id: "sculpin", name: "Sculpin", active_months: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { id: "baitfish", name: "Baitfish / minnow", active_months: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { id: "leech", name: "Leech", active_months: [4,5,6,7,8,9,10] },
    { id: "crayfish", name: "Crayfish", active_months: [5,6,7,8,9,10] },
    { id: "hellgrammite", name: "Hellgrammite (dobsonfly larva)", active_months: [4,5,6,7,8,9] },
    { id: "frog", name: "Frog", active_months: [5,6,7,8,9] },
    { id: "mouse", name: "Mouse", active_months: [6,7,8,9] },
    { id: "egg", name: "Drifting eggs", active_months: [10,11,12,1,2,3] },
    { id: "shrimp", name: "Shrimp / krill", active_months: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { id: "worm", name: "Worm", active_months: [11,12,1,2,3] },
    { id: "scent_bait", name: "Scent / cut bait trigger", active_months: [5,6,7,8,9] }
  ],

  flies: [
    { id: "adams", name: "Adams (Dry, #12-18)", imitates: ["mayfly"], water_types: ["river","stream"], category: "dry fly" },
    { id: "elk_hair_caddis", name: "Elk Hair Caddis (Dry, #12-16)", imitates: ["caddisfly"], water_types: ["river","stream"], category: "dry fly" },
    { id: "blue_winged_olive", name: "Blue-Winged Olive Parachute (Dry, #16-20)", imitates: ["mayfly"], water_types: ["river","stream"], category: "dry fly" },
    { id: "pheasant_tail", name: "Pheasant Tail Nymph (#14-18)", imitates: ["mayfly","small_nymph"], water_types: ["river","stream","lake"], category: "nymph" },
    { id: "hares_ear", name: "Gold-Ribbed Hare's Ear (#12-18)", imitates: ["mayfly","caddisfly","small_nymph"], water_types: ["river","stream","lake"], category: "nymph" },
    { id: "stonefly_nymph_pattern", name: "Pat's Rubber Legs / Stonefly Nymph (#6-10)", imitates: ["stonefly","stonefly_nymph"], water_types: ["river","stream"], category: "nymph" },
    { id: "salmonfly_dry", name: "Salmonfly Dry (#4-8)", imitates: ["stonefly"], water_types: ["river","stream"], category: "dry fly" },
    { id: "zebra_midge", name: "Zebra Midge (#16-22)", imitates: ["midge"], water_types: ["river","stream","lake"], category: "nymph" },
    { id: "brassie", name: "Brassie, red (#16-22)", imitates: ["midge"], water_types: ["river","stream"], category: "nymph" },
    { id: "san_juan_worm", name: "San Juan Worm (#10-14)", imitates: ["worm"], water_types: ["river","stream"], category: "nymph" },
    { id: "egg_fly", name: "Egg Fly, yellow/orange (#10-14)", imitates: ["egg"], water_types: ["river","stream"], category: "nymph" },
    { id: "woolly_bugger_black", name: "Woolly Bugger - Black (#4-10)", imitates: ["leech","baitfish","sculpin","hellgrammite"], water_types: ["river","stream","lake","pond"], category: "streamer" },
    { id: "woolly_bugger_olive", name: "Woolly Bugger - Olive (#4-10)", imitates: ["leech","sculpin","crayfish","hellgrammite"], water_types: ["river","stream","lake","pond"], category: "streamer" },
    { id: "muddler_minnow", name: "Muddler Minnow (#2-8)", imitates: ["sculpin","baitfish"], water_types: ["river","stream","lake"], category: "streamer" },
    { id: "clouser_minnow", name: "Clouser Minnow (#1-6)", imitates: ["baitfish","sculpin","shrimp"], water_types: ["river","lake","saltwater_nearshore"], category: "streamer" },
    { id: "egg_sucking_leech", name: "Egg-Sucking Leech, pink/black (#2-6)", imitates: ["leech","egg"], water_types: ["river"], category: "streamer" },
    { id: "intruder", name: "Intruder (Steelhead, #1-3)", imitates: ["baitfish"], water_types: ["river"], category: "streamer" },
    { id: "mickey_finn", name: "Mickey Finn (#2-6)", imitates: ["baitfish"], water_types: ["river","saltwater_nearshore"], category: "streamer" },
    { id: "clouser_crayfish", name: "Clouser Crayfish (#4-8)", imitates: ["crayfish"], water_types: ["lake","river","pond"], category: "streamer" },
    { id: "damsel_nymph", name: "Damselfly Nymph, olive (#10-14)", imitates: ["damselfly"], water_types: ["lake","pond"], category: "nymph" },
    { id: "dragonfly_nymph", name: "Dragonfly Nymph (#6-10)", imitates: ["dragonfly"], water_types: ["lake","pond"], category: "nymph" },
    { id: "popper_frog", name: "Frog Popper (#2-6)", imitates: ["frog"], water_types: ["lake","pond"], category: "topwater" },
    { id: "deer_hair_mouse", name: "Deer Hair Mouse (#2-4)", imitates: ["mouse"], water_types: ["river","lake"], category: "topwater" },
    { id: "foam_spider", name: "Foam Spider / Panfish Popper (#8-12)", imitates: ["terrestrial","midge"], water_types: ["lake","pond"], category: "topwater" },
    { id: "bluegill_bug", name: "Bluegill Bug, foam triangle (#8-12)", imitates: ["damselfly","terrestrial"], water_types: ["lake","pond"], category: "topwater" },
    { id: "yellow_bellied_woolly", name: "Yellow-Bellied Woolly Bugger (#4-8)", imitates: ["frog","baitfish","crayfish"], water_types: ["lake","pond"], category: "streamer" },
    { id: "ant_pattern", name: "Foam Ant / Beetle (#12-16)", imitates: ["terrestrial"], water_types: ["river","stream","lake"], category: "dry fly" },
    { id: "shrimp_pattern", name: "Shrimp / Crazy Charlie (#4-8)", imitates: ["shrimp"], water_types: ["saltwater_nearshore"], category: "streamer" }
  ],

  lures: [
    { id: "jig_head_minnow", name: "Jig Head + Soft Plastic Minnow (1/8-1/4 oz)", imitates: ["baitfish","sculpin"], water_types: ["lake","river"], category: "jig" },
    { id: "ned_rig", name: "Ned Rig (light jig + small plastic)", imitates: ["crayfish","small_nymph"], water_types: ["lake","river"], category: "jig" },
    { id: "tube_jig", name: "Tube Jig, blue/green (3.5in)", imitates: ["baitfish","crayfish"], water_types: ["lake"], category: "jig" },
    { id: "marabou_jig", name: "Marabou Jig, white/chartreuse", imitates: ["baitfish"], water_types: ["lake","river"], category: "jig" },
    { id: "ice_jig", name: "Ice Jig / Micro Jig, tipped with bait", imitates: ["midge","small_nymph"], water_types: ["lake"], category: "jig" },
    { id: "deep_diving_jig", name: "Deep Vertical Jig, heavy (1-3 oz)", imitates: ["sculpin","baitfish"], water_types: ["lake"], category: "jig" },
    { id: "spoon_casting", name: "Casting Spoon, silver/gold (1/4-3/4 oz)", imitates: ["baitfish"], water_types: ["river","lake","saltwater_nearshore"], category: "spoon" },
    { id: "spoon_trolling", name: "Trolling Spoon, small fluorescent", imitates: ["baitfish","shrimp"], water_types: ["river","saltwater_nearshore"], category: "spoon" },
    { id: "inline_spinner", name: "Inline Spinner (Blue Fox / Mepps style)", imitates: ["baitfish"], water_types: ["river","stream"], category: "spinner" },
    { id: "spinnerbait", name: "Spinnerbait, chartreuse/white skirt", imitates: ["baitfish","frog"], water_types: ["lake","pond"], category: "spinner" },
    { id: "crankbait_shallow", name: "Shallow Crankbait, craw/shad pattern", imitates: ["crayfish","baitfish"], water_types: ["lake","river"], category: "crankbait" },
    { id: "crankbait_deep", name: "Deep-Diving Crankbait", imitates: ["baitfish","sculpin"], water_types: ["lake"], category: "crankbait" },
    { id: "lipless_crankbait", name: "Lipless Crankbait / Rattle Bait", imitates: ["baitfish"], water_types: ["lake"], category: "crankbait" },
    { id: "soft_plastic_worm", name: "Soft Plastic Worm (Texas/wacky rig)", imitates: ["worm","leech"], water_types: ["lake","pond"], category: "soft plastic" },
    { id: "drop_shot_rig", name: "Drop Shot Rig, small finesse worm", imitates: ["worm","small_nymph"], water_types: ["lake"], category: "soft plastic" },
    { id: "jig_and_pig", name: "Jig and Pig, craw trailer", imitates: ["crayfish"], water_types: ["lake","pond"], category: "jig" },
    { id: "topwater_frog_lure", name: "Hollow-Body Frog (topwater)", imitates: ["frog"], water_types: ["lake","pond"], category: "topwater" },
    { id: "buzzbait", name: "Buzzbait (topwater)", imitates: ["frog","baitfish"], water_types: ["lake","pond"], category: "topwater" },
    { id: "roe_bag", name: "Roe Bag, cured salmon eggs", imitates: ["egg"], water_types: ["river"], category: "bait" },
    { id: "stink_bait_rig", name: "Stink Bait / Cut Bait on Treble", imitates: ["scent_bait"], water_types: ["river","lake"], category: "bait" },
    { id: "nightcrawler_rig", name: "Live Nightcrawler on Bottom Rig", imitates: ["worm"], water_types: ["river","lake"], category: "bait" },
    { id: "minnow_rig", name: "Live Minnow under Slip Bobber", imitates: ["baitfish"], water_types: ["lake","river"], category: "bait" },
    { id: "leech_rig", name: "Live Leech on Jig Head", imitates: ["leech"], water_types: ["lake"], category: "bait" }
  ]
};

const WATER_TYPES = [
  { id: "river", name: "River" },
  { id: "stream", name: "Stream" },
  { id: "lake", name: "Lake" },
  { id: "pond", name: "Pond" },
  { id: "saltwater_nearshore", name: "Saltwater (nearshore)" }
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// Combine insects + baitfish_other into one lookup map of "food sources"
const FOOD_MAP = {};
DATA.insects.forEach(i => FOOD_MAP[i.id] = { ...i, months: i.hatch_months, kind: "hatch" });
DATA.baitfish_other.forEach(b => FOOD_MAP[b.id] = { ...b, months: b.active_months, kind: "forage" });

// ============ RECOMMENDATION ENGINE ============
// Graph traversal: Fish -> diet (food sources) -> active this month? -> Fly/Lure that imitates it -> works in this water?
function getRecommendations(fishId, waterType, month, gearItems) {
  const fish = DATA.fish.find(f => f.id === fishId);
  if (!fish) return [];

  const results = [];

  fish.diet.forEach(foodId => {
    const food = FOOD_MAP[foodId];
    if (!food) return;

    const isActive = food.months.includes(month);

    gearItems.forEach(item => {
      if (!item.imitates.includes(foodId)) return;
      if (!item.water_types.includes(waterType)) return;

      results.push({
        item,
        food,
        foodId,
        isActive,
        // score: active food + water match = best
        score: (isActive ? 2 : 0) + 1
      });
    });
  });

  // Sort: active-month matches first, then by food/item name for stability
  results.sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));

  // De-dupe by item id (an item might match multiple foods - keep best reasoning)
  const seen = new Map();
  results.forEach(r => {
    if (!seen.has(r.item.id) || r.score > seen.get(r.item.id).score) {
      seen.set(r.item.id, r);
    }
  });

  return Array.from(seen.values()).sort((a, b) => b.score - a.score);
}

// ============ COMPONENTS ============
function ReasoningChain({ rec, fish, waterTypeName, monthName }) {
  const waterLabel = WATER_TYPES.find(w => w.id === fish.water_types[0])?.name;
  return (
    <ol className="reasoning-chain">
      <li>
        <span className="step-label">Fish</span>
        <span>{fish.name} feeds on {rec.food.name.toLowerCase()}</span>
      </li>
      <li>
        <span className="step-label">Season</span>
        <span>
          {rec.isActive
            ? `${rec.food.name} is active/hatching in ${monthName}`
            : `${rec.food.name} is present year-round, so it's still a staple in ${monthName}`}
        </span>
      </li>
      <li>
        <span className="step-label">Water</span>
        <span>{rec.item.name} is effective in {waterTypeName.toLowerCase()} water</span>
      </li>
      <li>
        <span className="step-label">Match</span>
        <span>{rec.item.name} imitates {rec.food.name.toLowerCase()} — recommended</span>
      </li>
    </ol>
  );
}

function RecCard({ rec, fish, waterTypeName, monthName }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rec-card">
      <button className="rec-header" onClick={() => setOpen(!open)}>
        <div className="rec-main">
          <div className="rec-name">{rec.item.name}</div>
          <div className="rec-sub">
            {rec.item.category} &middot; imitates {rec.food.name.toLowerCase()}
            {rec.isActive && <span className="badge-active">active now</span>}
          </div>
        </div>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && (
        <div className="rec-detail">
          <ReasoningChain rec={rec} fish={fish} waterTypeName={waterTypeName} monthName={monthName} />
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [gear, setGear] = useState("fly"); // "fly" or "conventional"
  const [fishId, setFishId] = useState("rainbow_trout");
  const [waterType, setWaterType] = useState("river");
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const fish = DATA.fish.find(f => f.id === fishId);
  const gearItems = gear === "fly" ? DATA.flies : DATA.lures;
  const waterTypeName = WATER_TYPES.find(w => w.id === waterType)?.name || waterType;
  const monthName = MONTHS[month - 1];

  const recs = useMemo(
    () => getRecommendations(fishId, waterType, month, gearItems),
    [fishId, waterType, month, gear]
  );

  // Filter water type options to those valid for the selected fish
  const validWaterTypes = WATER_TYPES.filter(w => fish.water_types.includes(w.id));

  // If current waterType isn't valid for this fish, snap to first valid one
  React.useEffect(() => {
    if (!fish.water_types.includes(waterType)) {
      setWaterType(fish.water_types[0]);
    }
  }, [fishId]);

  return (
    <div className="app">
      <style>{`
        .app {
          font-family: system-ui;
          color: #1a1a1a;
          max-width: 720px;
          margin: 0 auto;
          padding: 1.5rem;
        }
        h1 {
          font-size: 22px;
          font-weight: 500;
          margin: 0 0 4px;
        }
        .subtitle {
          color: #666;
          font-size: 14px;
          margin: 0 0 1.5rem;
        }
        .controls {
          display: grid;
          gap: 12px;
          margin-bottom: 1.5rem;
        }
        .gear-toggle {
          display: flex;
          gap: 8px;
        }
        .gear-toggle button {
          flex: 1;
          padding: 10px 16px;
          border: 0.5px solid #ccc;
          border-radius: 8px;
          background: #fff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          color: #1a1a1a;
        }
        .gear-toggle button.active {
          background: #e6f1fb;
          border-color: #378ADD;
          color: #185fa5;
        }
        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .field label {
          font-size: 13px;
          color: #666;
          font-weight: 500;
        }
        select {
          padding: 8px 10px;
          border: 0.5px solid #ccc;
          border-radius: 8px;
          background: #fff;
          font-size: 14px;
          color: #1a1a1a;
        }
        .results-heading {
          font-size: 16px;
          font-weight: 500;
          margin: 0 0 0.75rem;
        }
        .results-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .rec-card {
          border: 0.5px solid #e5e5e5;
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
        }
        .rec-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: #1a1a1a;
        }
        .rec-name {
          font-size: 14px;
          font-weight: 500;
        }
        .rec-sub {
          font-size: 12px;
          color: #888;
          margin-top: 2px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .badge-active {
          background: #eaf3de;
          color: #3b6d11;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 6px;
          font-weight: 500;
        }
        .rec-detail {
          padding: 0 14px 14px 14px;
          border-top: 0.5px solid #e5e5e5;
        }
        .reasoning-chain {
          list-style: none;
          margin: 12px 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .reasoning-chain li {
          display: flex;
          gap: 10px;
          font-size: 13px;
          align-items: baseline;
        }
        .step-label {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #aaa;
          min-width: 56px;
          flex-shrink: 0;
        }
        .empty-state {
          text-align: center;
          padding: 2rem 1rem;
          color: #888;
          font-size: 14px;
        }
      `}</style>

      <h1>PNW fly &amp; tackle finder</h1>
      <p className="subtitle">
        Pick your target, water, and month — recommendations are traced from
        what the fish eats, to what's active that month, to what works in
        that water.
      </p>

      <div className="controls">
        <div className="gear-toggle">
          <button
            className={gear === "fly" ? "active" : ""}
            onClick={() => setGear("fly")}
          >
            Fly fishing
          </button>
          <button
            className={gear === "conventional" ? "active" : ""}
            onClick={() => setGear("conventional")}
          >
            Conventional / jig
          </button>
        </div>

        <div className="field">
          <label>Target species</label>
          <select value={fishId} onChange={e => setFishId(e.target.value)}>
            {DATA.fish.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Water type</label>
            <select value={waterType} onChange={e => setWaterType(e.target.value)}>
              {validWaterTypes.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Month</label>
            <select value={month} onChange={e => setMonth(Number(e.target.value))}>
              {MONTHS.map((m, idx) => (
                <option key={m} value={idx + 1}>{m}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <h2 className="results-heading">
        {fish.name} &middot; {waterTypeName} &middot; {monthName}
      </h2>

      {recs.length === 0 ? (
        <div className="empty-state">
          No matches in the knowledge base for this combination yet.
        </div>
      ) : (
        <div className="results-list">
          {recs.map(rec => (
            <RecCard
              key={rec.item.id}
              rec={rec}
              fish={fish}
              waterTypeName={waterTypeName}
              monthName={monthName}
            />
          ))}
        </div>
      )}
    </div>
  );
}
