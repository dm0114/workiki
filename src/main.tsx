import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { View } from "./view";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

createRoot(rootElement).render(
	<StrictMode>
		<View />
	</StrictMode>,
);

// // src/hooks/useAuth.ts
// import { useEffect, useState } from 'react'
// import { User } from '@supabase/supabase-js'
// import { supabase } from '../lib/supabase'

// export function useAuth() {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null)
//       setLoading(false)
//     })

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
//       setUser(session?.user ?? null)
//     })

//     return () => subscription.unsubscribe()
//   }, [])

//   return { user, loading }
// }

// // src/hooks/useWorkLogs.ts
// import { useState, useEffect } from 'react'
// import { supabase } from '../lib/supabase'

// export interface WorkLog {
//   id: string
//   user_id: string
//   content: string
//   summary: string
//   key_points: string[]
//   suggestions: string[]
//   tags: string[]
//   created_at: string
// }

// export function useWorkLogs() {
//   const [workLogs, setWorkLogs] = useState<WorkLog[]>([])
//   const [loading, setLoading] = useState(true)

//   async function fetchWorkLogs() {
//     try {
//       const { data, error } = await supabase
//         .from('work_logs')
//         .select('*')
//         .order('created_at', { ascending: false })

//       if (error) throw error
//       setWorkLogs(data || [])
//     } catch (error) {
//       console.error('Error fetching work logs:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchWorkLogs()
//   }, [])

//   return { workLogs, loading, refreshWorkLogs: fetchWorkLogs }
// }

// // src/components/WorkLogEditor.tsx
// import { useState } from 'react'
// import { supabase } from '../lib/supabase'
// import { analyzeWorkLog } from '../lib/claude'

// export default function WorkLogEditor() {
//   const [content, setContent] = useState('')
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!content.trim()) return

//     setIsSubmitting(true)
//     try {
//       // 1. Claude API로 분석
//       const analysis = await analyzeWorkLog(content)

//       // 2. Supabase에 저장
//       const { error } = await supabase.from('work_logs').insert([{
//         content,
//         summary: analysis.summary,
//         key_points: analysis.keyPoints,
//         suggestions: analysis.suggestions,
//         tags: analysis.tags
//       }])

//       if (error) throw error

//       // 3. 입력 폼 초기화
//       setContent('')
//       alert('업무 기록이 저장되었습니다.')
//     } catch (error) {
//       console.error('Error saving work log:', error)
//       alert('저장 중 오류가 발생했습니다.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-2 font-medium">
//             오늘의 업무 기록
//           </label>
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full h-48 p-2 border rounded resize-none"
//             placeholder="오늘 수행한 업무를 자유롭게 기록해주세요..."
//           />
//         </div>
        
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
//         >
//           {isSubmitting ? '저장 중...' : '저장하기'}
//         </button>
//       </form>
//     </div>
//   )
// }

// // src/components/WorkLogList.tsx
// import { useWorkLogs, WorkLog } from '../hooks/useWorkLogs'

// export default function WorkLogList() {
//   const { workLogs, loading } = useWorkLogs()

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">업무 기록 목록</h2>
//       <div className="space-y-4">
//         {workLogs.map((log) => (
//           <WorkLogCard key={log.id} log={log} />
//         ))}
//       </div>
//     </div>
//   )
// }

// function WorkLogCard({ log }: { log: WorkLog }) {
//   return (
//     <div className="border rounded-lg p-4 space-y-3">
//       <p className="text-sm text-gray-500">
//         {new Date(log.created_at).toLocaleDateString()}
//       </p>
      
//       <p className="font-medium">{log.summary}</p>
      
//       <div className="space-y-2">
//         <h4 className="font-medium">주요 포인트</h4>
//         <ul className="list-disc pl-4">
//           {log.key_points.map((point, i) => (
//             <li key={i}>{point}</li>
//           ))}
//         </ul>
//       </div>

//       {log.suggestions.length > 0 && (
//         <div className="space-y-2">
//           <h4 className="font-medium">개선 사항</h4>
//           <ul className="list-disc pl-4">
//             {log.suggestions.map((suggestion, i) => (
//               <li key={i}>{suggestion}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="flex gap-2">
//         {log.tags.map((tag, i) => (
//           <span key={i} className="px-2 py-1 bg-gray-100 rounded text-sm">
//             {tag}
//           </span>
//         ))}
//       </div>
//     </div>
//   )
// }

// // src/App.tsx
// import { useAuth } from './hooks/useAuth'
// import WorkLogEditor from './components/WorkLogEditor'
// import WorkLogList from './components/WorkLogList'

// export default function App() {
//   const { user, loading } = useAuth()

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   if (!user) {
//     return <div>Please login</div>
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <WorkLogEditor />
//       <div className="my-8" />
//       <WorkLogList />
//     </div>
//   )
// }

