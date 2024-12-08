const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;

export async function analyzeWorkLog(content: string) {
	try {
		const response = await fetch("https://api.anthropic.com/v1/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": CLAUDE_API_KEY,
				"anthropic-version": "2023-06-01",
			},
			body: JSON.stringify({
				model: "claude-3-opus-20240229",
				max_tokens: 1000,
				messages: [
					{
						role: "user",
						content: `다음 업무 기록을 분석해서 JSON 형식으로 반환해주세요:
          {
            "summary": "핵심 내용 한줄 요약",
            "keyPoints": ["주요 포인트1", "주요 포인트2"...],
            "suggestions": ["개선사항1", "개선사항2"...],
            "tags": ["태그1", "태그2", "태그3"]
          }
          
          업무 기록:
          ${content}`,
					},
				],
			}),
		});

		const data = await response.json();
		return JSON.parse(data.content[0].text);
	} catch (error) {
		console.error("Error analyzing work log:", error);
		throw error;
	}
}
