import { formatCurrency, cn } from './src/lib/data';

// Mock localStorage for node environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; }
  };
})();

global.localStorage = localStorageMock as any;

async function runTests() {
  console.log("🚀 Starting Unit Tests for 'El Ingeniero Loco' Functions...");
  let passed = 0;
  let failed = 0;

  // Test 1: formatCurrency
  try {
    const formatted = formatCurrency(150000);
    if (formatted.includes("$") && formatted.includes("150")) {
      console.log("✅ Test formatCurrency: PASSED");
      passed++;
    } else {
      throw new Error(`Expected Chilean currency format, got: ${formatted}`);
    }
  } catch (e) {
    console.error("❌ Test formatCurrency: FAILED", e);
    failed++;
  }

  // Test 2: cn (Class Merge)
  try {
    const classes = cn("px-4", "bg-red-500", false && "hidden");
    if (classes === "px-4 bg-red-500") {
      console.log("✅ Test cn (Class Merge): PASSED");
      passed++;
    } else {
      throw new Error(`Expected 'px-4 bg-red-500', got: '${classes}'`);
    }
  } catch (e) {
    console.error("❌ Test cn: FAILED", e);
    failed++;
  }

  // Test 3: Site Settings Initialization
  try {
    const { getSettings } = await import('./src/lib/data');
    const settings = getSettings();
    if (settings.hero.title && settings.hero.description) {
      console.log("✅ Test Site Settings Initialization: PASSED");
      passed++;
    } else {
      throw new Error("Settings not initialized correctly");
    }
  } catch (e) {
    console.error("❌ Test Site Settings: FAILED", e);
    failed++;
  }

  console.log(`\n📊 SUMMARY: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTests();
