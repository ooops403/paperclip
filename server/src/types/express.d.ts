// Type augmentation for the actor metadata that
// `actorMiddleware` (server/src/middleware/auth.ts) attaches to every
// incoming request.
//
// Two complementary augmentations:
//   1. `declare global { namespace Express { interface Request } }` — the
//      historic pattern, merges with the global Express namespace from
//      @types/express-serve-static-core.
//   2. `declare module "express-serve-static-core"` — augments the module
//      where the Request interface is actually defined. Required in some
//      build environments (Express 5 + module: NodeNext + isolatedModules)
//      where the global-namespace augmentation alone is unreliable.

export {};

interface PaperclipActor {
  type: "board" | "agent" | "none";
  userId?: string;
  userName?: string | null;
  userEmail?: string | null;
  agentId?: string;
  companyId?: string;
  companyIds?: string[];
  memberships?: Array<{
    companyId: string;
    membershipRole?: string | null;
    status?: string;
  }>;
  isInstanceAdmin?: boolean;
  keyId?: string;
  runId?: string;
  source?:
    | "local_implicit"
    | "session"
    | "board_key"
    | "agent_key"
    | "agent_jwt"
    | "cloud_tenant"
    | "none";
}

declare global {
  namespace Express {
    interface Request {
      actor: PaperclipActor;
    }
  }
}

declare module "express-serve-static-core" {
  interface Request {
    actor: PaperclipActor;
  }
}
