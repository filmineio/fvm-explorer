import { User } from "../../types/AppState";

import { transformer } from "@/ui/state/utils/transformer";

import { Maybe } from "@/types/Maybe";

export const setUserTransformer = transformer<Maybe<User>>("user");