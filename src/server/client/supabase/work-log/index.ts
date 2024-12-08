import { supabaseClient } from "..";
import type { Tables } from "../types";

export interface WorkLog extends Tables<"work_logs"> {}

export const workLogClient = supabaseClient.from("work_logs");
