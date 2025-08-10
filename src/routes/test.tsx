import { useState, useRef, useEffect } from "react";
import { mastraClient } from "../lib/mastra";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Test() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // 模拟打字效果
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const agent = mastraClient.getAgent("parallelWorldAgent");
      const response = await agent.generate({
        messages: [{ role: "user", content: inputValue }]
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "抱歉，我遇到了一些问题。请检查网络连接或稍后再试。",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.closest("form");
      form?.requestSubmit();
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // 可以添加一个临时的成功提示
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  const sampleQuestions = [
    "你好，请介绍一下你自己",
    "今天天气怎么样？",
    "推荐一本好书",
    "如何学习编程？",
    "讲个笑话吧"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <span className="text-2xl">🤖</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AI 智能助手
          </h1>
          <p className="text-gray-600 text-lg">
            与AI进行智能对话，探索无限可能
          </p>
        </div>

        {/* 聊天容器 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* 消息列表 */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <div className="text-6xl mb-6">✨</div>
                <p className="text-xl mb-4">开始你的对话吧！</p>
                <p className="text-sm text-gray-400">试试点击下面的示例问题</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl relative group ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-800 shadow-md hover:shadow-lg transition-shadow"
                    }`}
                  >
                    <div className="text-sm leading-relaxed">{message.content}</div>
                    <div
                      className={`text-xs mt-2 flex items-center justify-between ${
                        message.role === "user" ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      <span>{formatTime(message.timestamp)}</span>
                      {message.role === "assistant" && (
                        <button
                          onClick={() => copyToClipboard(message.content)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 hover:text-blue-600"
                          title="复制消息"
                        >
                          📋
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {/* 加载指示器 */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {isTyping ? "AI正在思考..." : "AI正在回复..."}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* 输入区域 */}
          <div className="border-t border-gray-200/50 p-6 bg-gray-50/50">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入你的问题... (按 Enter 发送，Shift+Enter 换行)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
                  Enter
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>发送中...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>发送</span>
                    <span className="text-lg">🚀</span>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* 示例问题 */}
        <div className="mt-6">
          <h3 className="text-center text-gray-600 mb-4 font-medium">💡 试试这些示例问题</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {sampleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputValue(question);
                  inputRef.current?.focus();
                }}
                className="px-4 py-2 bg-white/60 backdrop-blur-sm text-gray-700 rounded-full hover:bg-white/80 transition-all duration-200 text-sm border border-gray-200/50 hover:border-gray-300/50 hover:shadow-md"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* 功能按钮 */}
        <div className="mt-8 flex justify-center space-x-6">
          <button
            onClick={() => {
              setMessages([]);
              inputRef.current?.focus();
            }}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 border border-gray-200/50 hover:border-gray-300/50"
          >
            🗑️ 清空对话
          </button>
          <button
            onClick={() => {
              const welcomeMessage = "你好！我是你的AI助手，有什么可以帮助你的吗？";
              const welcomeMsg: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: welcomeMessage,
                timestamp: new Date(),
              };
              setMessages([welcomeMsg]);
            }}
            className="px-6 py-3 text-blue-600 hover:text-blue-800 transition-colors bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 border border-gray-200/50 hover:border-gray-300/50"
          >
            👋 开始新对话
          </button>
        </div>

        {/* 状态信息 */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>💡 提示：你可以使用 Shift+Enter 在输入框中换行</p>
          <p className="mt-1">消息总数: {messages.length} | 最后更新: {new Date().toLocaleString("zh-CN")}</p>
        </div>
      </div>
    </div>
  );
}