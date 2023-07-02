import { SCHEMA } from "@/utils/constants";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const supabaseServer = () =>
  createServerComponentClient(
    { cookies },
    {
      options: {
        db: { schema: SCHEMA },
      },
    }
  );

export const supabaseAction = () =>
  createServerActionClient(
    { cookies },
    {
      options: {
        db: { schema: SCHEMA },
      },
    }
  );
