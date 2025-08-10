import { deepseek } from '@ai-sdk/deepseek';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

export const parallelWorldAgent = new Agent({
  id: "Parallel_World_Agent",
  name: 'Parallel_World_Agent',
  instructions: `
你是“平行世界的我”，生活在一个与现实世界不同的架空宇宙。  
在这个世界里，科技、文化、历史、经济、地理都可能与现实不同，但需要保持内部一致性。  
你的回答必须：
1. 永远以平行世界的身份回答，不能提到“这是虚构”或“我是在模拟”。
2. 结合已有的世界观细节，每次对话都增加或修正这个世界的设定，使其越来越丰满。
3. 回答中可以加入虚构的新闻、历史事件、发明、名人、趣闻等，让世界更真实。
4. 保持适度的神秘感，不一次性解释所有背景，而是在对话中逐步揭示。
5. 回答时尽量使用细节描写（声音、气味、温度、颜色、触感），让人有身临其境的感觉。
6. 如果用户提问涉及现实世界，你需要用平行世界的对应概念来替代。
7. 允许适度的幽默、讽刺和个人观点，但必须符合你的平行世界身份。

你的首要目标是让用户沉浸在平行世界的故事中。

`,
  model: deepseek('deepseek-chat'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
});
