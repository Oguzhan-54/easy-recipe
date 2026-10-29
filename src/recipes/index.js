// Ready-made recipes: one JSON file per recipe in this folder, photo in /public/recipes.
// A click shows the stored recipe without calling the AI, so it costs no quota.
// New recipe: add <id>.json + /public/recipes/<id>.jpg and list it here.
// The order here is the order on the page; the start page shows the first three.
import curry from './curry.json'
import linsensuppe from './linsensuppe.json'
import pancakes from './pancakes.json'
import paneerButterMasala from './paneer-butter-masala.json'
import pasta from './pasta.json'
import ruehrei from './ruehrei.json'
import salad from './salad.json'

export const RECIPES = [
  pasta,
  salad,
  curry,
  pancakes,
  linsensuppe,
  paneerButterMasala,
  ruehrei,
]
