
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { parallelWorldAgent } from './agents/parallelWorld-agent';
import { CloudflareDeployer } from "@mastra/deployer-cloudflare";

export const mastra = new Mastra({
  agents: { parallelWorldAgent },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  deployer: new CloudflareDeployer({
    projectName: "parallel-world-agent",
    routes: [
      {
        pattern: "laoyuandebing.site/*",
        zone_name: "laoyuandebing.site",
        custom_domain: true,
      },
    ],
    workerNamespace: "parallel-world-agent-worker",
  }),
});
