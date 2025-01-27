export type sortMethod = "Name" | "Price" | "Manufacturer" | "Created On";
export type direction = "asc" | "desc";
export interface ISort  {
    field: sortMethod,
    direction: direction
}