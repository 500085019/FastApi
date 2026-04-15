import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, LogOut, Plus, Settings, Menu, X } from 'lucide-react'
import clsx from 'clsx'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ChatBotProps {
  user: any
  onLogout: () => void
}

const ChatBot: React.FC<ChatBotProps> = ({ user, onLogout }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hey ${user.username}! 👋 Welcome to FastAPI Chat. I'm your AI assistant, ready to help!`,
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const responses: { [key: string]: string } = {
      hello: "Hello! 👋 How can I assist you today? I can help with users, items, or general questions.",
      hi: "Hi there! What would you like to know? I'm here to help! 🤖",
      help: "📚 I can help you with:\n• Managing users\n• Creating and viewing items\n• System information\n• API documentation",
      users: "👥 Users are individual accounts in the system. You can:\n• Create new users\n• View all users\n• Update user information\n• Delete users",
      items: "📦 Items are resources managed by users. Each item has:\n• Name and description\n• Price\n• Ownership (linked to a user)",
      create: "✨ To create content:\n1. Users: Fill the form with email and details\n2. Items: Associate with a user ID\nBoth are quick and easy!",
      thanks: "You're welcome! 😊 Is there anything else I can help you with?",
      bye: "Goodbye! 👋 Have a wonderful day!",
      features: "✨ Key features:\n• Real-time chat\n• User management\n• Item tracking\n• Secure access\n• Fast API backed",
    }

    const lowerMessage = userMessage.toLowerCase()
    for (const [key, value] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return value
      }
    }

    return '🤔 Interesting question! Try asking about users, items, features, or how to create content.'
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 600)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background animated elements */}
      <motion.div
        className="fixed top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 30, 0, -30],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"
        animate={{
          x: [0, -30, 30, 0],
          y: [0, -30, 0, 30],
        }}
        transition={{ duration: 15, repeat: Infinity, delay: 2 }}
      />

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-purple-900/40 to-blue-900/40 backdrop-blur-xl border-r border-white/10 z-40 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white">Chats</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X size={20} className="text-white" />
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 mb-6 transition-all duration-300"
            >
              <Plus size={20} />
              New Chat
            </motion.button>

            <div className="flex-1 space-y-3 overflow-y-auto">
              {['Today', 'Yesterday', 'Last Week'].map((label, idx) => (
                <div key={idx}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{label}</p>
                  {[1, 2].map((item, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ x: 5 }}
                      className="w-full text-left p-3 rounded-lg hover:bg-white/10 text-gray-300 text-sm transition truncate"
                    >
                      Chat {idx * 2 + i + 1}
                    </motion.button>
                  ))}
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Settings size={18} />
              Settings
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      <div className="flex flex-col flex-1 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl text-white px-6 py-5 shadow-2xl border-b border-white/10 flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
            >
              <Menu size={24} className="text-white" />
            </motion.button>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-50" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl text-2xl">
                🤖
              </div>
            </motion.div>

            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-black tracking-tight">Chat Assistant</h1>
              <p className="text-xs text-purple-200/70 font-medium">
                Welcome, <span className="text-purple-200 font-bold">{user.username}</span>
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="px-6 py-2.5 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/40 hover:to-pink-500/40 text-red-200 border border-red-500/50 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 backdrop-blur-sm flex items-center gap-2"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </motion.button>
        </motion.div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                variants={messageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: index * 0.05 }}
                className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-600 flex items-center justify-center text-lg shadow-lg flex-shrink-0"
                  >
                    🤖
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={clsx(
                    'max-w-sm lg:max-w-md px-5 py-4 rounded-2xl backdrop-blur-lg transition-all duration-300',
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-purple-600 to-blue-700 text-white rounded-br-none shadow-lg shadow-purple-500/40 border border-purple-400/50'
                      : 'bg-gradient-to-br from-white/15 to-white/5 text-gray-100 border border-white/20 rounded-bl-none shadow-lg shadow-black/40 hover:bg-white/20'
                  )}
                >
                  <div className="break-words leading-relaxed text-sm font-medium whitespace-pre-wrap">
                    {message.text}
                  </div>
                  <div
                    className={clsx(
                      'text-xs mt-2.5 font-mono',
                      message.sender === 'user' ? 'text-purple-100/60' : 'text-gray-400/70'
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </motion.div>

                {message.sender === 'user' && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-lg shadow-lg flex-shrink-0"
                  >
                    👤
                  </motion.div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                variants={messageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-600 flex items-center justify-center text-lg shadow-lg flex-shrink-0">
                  🤖
                </div>
                <motion.div className="bg-white/10 border border-white/20 rounded-2xl rounded-bl-none px-5 py-4 backdrop-blur-lg shadow-lg shadow-black/40">
                  <div className="flex gap-2 items-center h-6">
                    {[0, 1, 2].map(i => (
                      <motion.span
                        key={i}
                        className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.1,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-t from-slate-950/80 to-slate-950/40 backdrop-blur-xl border-t border-white/10 p-5 shadow-2xl"
        >
          <div className="flex gap-3 max-w-6xl mx-auto">
            <motion.div className="flex-1 relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-all duration-300"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message... (Try: hello, help, users, items, features)"
                className="relative w-full px-5 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-500/70 focus:outline-none transition-all duration-300 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/40 disabled:opacity-50 backdrop-blur-sm hover:bg-white/8 hover:border-white/40 font-medium text-sm"
                disabled={isLoading}
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/30"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <div className="relative flex items-center justify-center">
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Send size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Send size={20} />
                  </motion.div>
                )}
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ChatBot
