export const projects = [
  {
    id: 1,
    name: 'REG-NMS Matching Engine',
    year: '2025',
    description: 'High-frequency trading matching engine in C++17',
    preview: 'Architected a high-performance engine with ~230µs latency, async WAL, WebSocket thread pool for L2 market data, trailing stops, stop-loss, and crash-recovery from 100k+ log entries.',
    tags: ['C++17', 'HFT', 'WebSocket', 'WAL'],
    blogSlug: 'hft-matching-engine-reg-nms',
  },
  {
    id: 2,
    name: 'Vetta.ai',
    year: '2025',
    description: 'AI Technical Interviewer — full-duplex voice agent',
    preview: 'Engineered voice agent with FastAPI WebSockets, Deepgram Nova-2, ElevenLabs (<800ms latency). Stateful DSA assessment with Gemini 2.5, Redis context, secure sandbox, and 99% session continuity.',
    tags: ['FastAPI', 'WebSockets', 'Gemini', 'React'],
    blogSlug: 'voice-ai-interviewer-under-800ms-latency',
  },
  {
    id: 3,
    name: 'Relay',
    year: '2025',
    description: 'High-Performance AI Gateway',
    preview: 'Engineered a scalable AI Gateway and published a modular Go package for rate-limiting and cost-tracking middleware, cutting redundant upstream API calls by 40% via semantic caching. Secured 99.9% system availability with a fault-tolerant resilience layer (circuit breakers, Prometheus monitoring), designed as a reusable library for high-concurrency applications.',
    tags: ['Go', 'Rate limiting', 'Semantic caching', 'Prometheus'],
    blogSlug: 'ai-api-calls-leaking-money-relay',
  },
  {
    id: 4,
    name: 'Multi-provider RAG pipeline',
    year: '2025',
    description: 'TechiZen — Vertex AI, AWS Bedrock, Ollama',
    preview: 'Engineered RAG across Google Vertex AI, AWS Bedrock and Ollama using LangChain, handling 1,500+ contextual queries/month as the platform\'s core knowledge backbone.',
    tags: ['LangChain', 'Vertex AI', 'RAG'],
  },
  {
    id: 5,
    name: 'Candidate ranking system',
    year: '2025',
    description: 'HireZapp — FastAPI screening automation',
    preview: 'Engineered candidate ranking with FastAPI, reducing resume screening from 15 mins to <2 mins per candidate. LLM entity extraction with LangChain & Gemini at 95%+ accuracy.',
    tags: ['FastAPI', 'LangChain', 'Gemini'],
  },
]

export const experience = [
  {
    id: 1,
    company: 'TechiZen',
    role: 'AI Engineer Intern',
    period: 'Oct 2025— Feb 2026',
    description: 'Built RAG pipelines and LLM-powered assessment tools for an ed-tech platform.',
    points: [
      'Engineered multi-provider RAG pipeline (Vertex AI, AWS Bedrock, Ollama) with LangChain — 1,500+ queries/month.',
      'Built automated assessment pipeline from PDFs & YouTube transcripts, cutting manual content creation by 83%.',
      'Integrated NeMo Guardrails into student-facing LLM instructor — 90%+ reliability on jailbreaks, profanity, hallucinations.',
    ],
  },
  {
    id: 2,
    company: 'HireZapp',
    role: 'Software Developer Intern',
    period: 'Jun 2025 — Aug 2025',
    description: 'Automated resume screening and job description generation with LLMs.',
    points: [
      'Engineered candidate ranking system in FastAPI — screening time from 15 mins to <2 mins per candidate.',
      'Developed job description pipeline with web-scraped company data; reduced drafting from ~8 to ~2 iterations.',
      'Deployed LLM entity extraction (LangChain, Gemini) — 95%+ accuracy on Skills & Experience from diverse resumes.',
    ],
  },
  {
    id: 3,
    company: 'Thapar Institute of Engineering and Technology',
    role: 'Machine Learning Intern',
    period: 'Dec 2024 — May 2025',
    description: 'Research internship focused on biosignal processing and deep learning for assistive robotics.',
    points: [
      'Implemented real-time signal processing pipelines for multimodal biosignals (EEG, EMG, EOG) enabling low-latency motion intent prediction for a 6-DoF exoskeleton system.',
      'Designed attention-based fusion models (CNN-LSTM, LMDA-Net) improving prediction stability and accuracy over baseline.',
    ],
  },
]

export const achievements = [
  {
    id: 1,
    title: '700+ DSA problems · LeetCode top 8% · Contest rating 1759',
    description: 'Competitive problem-solving and algorithmic practice',
  },
  {
    id: 2,
    title: 'Codeforces 1587 · CodeChef 1719',
    description: 'Competitive programming profiles',
  },
  {
    id: 3,
    title: 'Meta Hacker Cup 2025 — Global Rank 758 (Round 2), 1899 (Round 1)',
    description: 'Meta’s global programming competition',
  },
  {
    id: 4,
    title: 'Winner — NatWest Hack4aCause 2025',
    description: 'AI platform for digitizing handwritten content and automated evaluation',
  },
  {
    id: 5,
    title: 'Top 100 — Amazon ML Challenge 2025',
    description: 'National-level machine learning competition',
  },
  {
    id: 6,
    title: 'Finalist — Smart India Hackathon 2024',
    description: 'National hackathons',
  },
  {
    id: 7,
    title: 'Top 5% Adobe GenSolve 2024',
    description: 'Adobe challenge',
  },
  {
    id: 8,
    title: 'Machine Learning Specialization — Andrew Ng, Stanford & DeepLearning.AI',
    description: 'Completed ML specialization',
  },
]

export const stack = {
  languages: ['C++', 'Python', 'Go', 'JavaScript', 'TypeScript', 'SQL'],
  backend: ['Node.js', 'FastAPI', 'Express.js', 'REST APIs', 'WebSockets', 'Docker'],
  frontend: ['React', 'Next.js', 'TailwindCSS', 'Framer Motion'],
  aiml: ['LangChain', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Gemini API', 'NeMo Guardrails'],
  cloud: ['AWS', 'GCP', 'Vercel', 'Docker', 'Linux'],
  databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'MySQL'],
  exploring: ['Kubernetes', 'Rust', 'Cursor'],
}

export const writing = [
  {
    id: 1,
    title: 'How I Built a Voice AI Interviewer with <800ms Latency',
    date: 'Aug 2025',
    excerpt: 'The story of building Vetta.ai and everything that broke along the way...',
    slug: 'voice-ai-interviewer-under-800ms-latency',
  },
  {
    id: 2,
    title: 'I Built a High-Frequency Trading Matching Engine. Here\'s What I Learned.',
    date: 'Oct 2025',
    excerpt: 'A REG-NMS compliant C++17 matching engine with ~230µs latency. What I built, why it matters, and what surprised me.',
    slug: 'hft-matching-engine-reg-nms',
  },
  {
    id: 3,
    title: 'Your AI API Calls Are Leaking Money. I Built a Fix',
    date: 'Jan 2026',
    excerpt: 'Relay: a Go reverse proxy and API gateway for AI services. Caching, rate limiting, cost tracking, circuit breaking.',
    slug: 'ai-api-calls-leaking-money-relay',
  },
]

export const blogPosts = [
  {
    slug: 'voice-ai-interviewer-under-800ms-latency',
    title: 'How I Built a Voice AI Interviewer with <800ms Latency',
    date: 'August 2025',
    readingTime: '9 min read',
    content: `The idea was simple: what if instead of staring at a LeetCode problem alone, you had an AI interviewer that actually talked to you - asked follow-up questions, pushed back on your approach, gave you hints when you were stuck?

Simple idea. Genuinely hard to build.

The moment you add voice to an AI system, every architectural decision you made for a text-based app falls apart. Latency that was "acceptable" at 2 seconds becomes unusable. Buffering that worked fine in HTTP becomes a nightmare over audio streams. State management that was clean in request-response becomes tangled when both sides are talking at once.

This is the story of building Vetta.ai - and everything that broke along the way.

The Latency Problem Nobody Talks About

When people quote latency numbers for AI voice apps, they're usually measuring the wrong thing.

They measure: time from user stops speaking to when the AI starts speaking.

What actually matters: does it feel like a real conversation?

These are not the same. A system can hit 600ms on the first metric and still feel robotic if the audio delivery is choppy, if it cuts you off mid-sentence, if it can't handle interruptions.

Real conversational latency has four components:

1. **STT (Speech-to-Text):** How fast can you transcribe what the user said?
2. **LLM inference:** How fast can the model generate a response?
3. **TTS (Text-to-Speech):** How fast can you convert that response to audio?
4. **Streaming delivery:** How fast does the audio actually reach the user's ears?

Each of these compounds. A 200ms STT + 400ms LLM + 300ms TTS = 900ms before the user hears a single word. That's already over the threshold where conversations feel natural.

My target was under 800ms end-to-end. Here's how I hit it.

The Stack

I chose FastAPI for the backend - specifically for its first-class WebSocket support and async architecture. For STT, Deepgram Nova-2. For TTS, ElevenLabs. For the AI brain, Gemini 2.5.

The naive architecture looks like this:

User speaks, then WebSocket, then STT, then LLM, then TTS, then WebSocket, then user hears.

This is sequential. Every component waits for the previous one to finish. At any reasonable quality level, this will never hit 800ms.

The real architecture looks nothing like this.

Parallelism Is Everything

The first insight: **TTS doesn't need to wait for the full LLM response.**

When Gemini starts streaming tokens, you don't wait for the complete sentence. The moment you have a natural sentence boundary - a period, a comma with enough context, a question mark - you fire that chunk to ElevenLabs immediately.

So while ElevenLabs is synthesizing the first sentence, Gemini is already generating the second. By the time the first audio chunk arrives at the client, the second is already in the TTS pipeline.

LLM token stream: [chunk1....] [chunk2....] [chunk3....]
TTS pipeline: [audio1.......] [audio2.......] [audio3.......]
Client playback: [audio1] [audio2] [audio3]

This alone dropped perceived latency by ~35%.

The Interruption Problem

Here's something nobody tells you about voice AI: **users will try to interrupt.**

In a real interview, you cut in mid-sentence all the time. "Wait, can you clarify what you mean by-" The interviewer stops, listens, responds.

A naive implementation will keep playing its audio even as you're speaking over it. The result feels like a bad phone call, not a conversation.

My solution was a dual-channel WebSocket architecture. The client maintains two separate streams:

- **Outbound:** User audio, sent continuously
- **Inbound:** AI audio, received and played back

On the server side, I run continuous VAD (Voice Activity Detection) on the inbound user audio even while the AI is speaking. The moment user speech is detected during AI playback, I send an **INTERRUPT** signal to the client, which immediately stops playback and sends a **CANCEL** signal back to terminate the in-flight TTS stream.

The key was making this interruption detection fast enough that it doesn't feel like the AI is ignoring you for 300ms before stopping. Under 150ms interrupt response was the goal. I got it to around 120ms.

Stateful Interviews with Redis

The voice layer was the hardest part of Vetta.ai to build, but it's not the most interesting part architecturally. That's the interview state machine.

A real technical interview has structure. The interviewer remembers what you said five minutes ago. They track which parts of the problem you've solved. They escalate hints based on how long you've been stuck.

This requires persistent state across WebSocket messages - which, in a serverless-friendly architecture, means Redis.

Every interview session gets a Redis key that stores: session_id, problem, conversation_history, hints_given, current_phase, code_snapshots, start_time.

The LLM prompt is dynamically constructed from this state on every turn. Gemini 2.5 never "knows" the full conversation - it gets a sliding window of context plus the current state object. This keeps latency predictable regardless of how long the interview runs.

The hint escalation logic was the most satisfying thing to tune. Three levels:

1. **Nudge:** "Think about what data structure would give you O(1) lookup."
2. **Hint:** "A hash map could help here. What would you store as the key?"
3. **Reveal:** "Consider storing each number's complement as you iterate..."

The system tracks time-on-current-phase and hint-count to decide when to escalate. It also monitors the code sandbox output - if the user is submitting and failing tests repeatedly, that's a signal to intervene even if they haven't explicitly asked for help.

The Code Sandbox

Every real interview has a coding environment. I built a sandboxed execution environment that supports Python and JavaScript, with strict resource limits:

- 5 second execution timeout
- 128MB memory limit
- No network access
- No filesystem writes

The sandbox runs in an isolated container. User code is submitted, executed, and the output (stdout, stderr, return value) is fed back into the LLM context so the interviewer can comment on actual test results.

"Your solution passes 18/20 test cases. The failing cases involve empty arrays - does your code handle that edge case?"

This detail - the AI actually seeing your code output - is what makes Vetta feel different from a chatbot pretending to be an interviewer.

What I'd Do Differently

**Streaming TTS chunking is brittle.** My sentence-boundary detection is regex-based and breaks on certain LLM outputs (code blocks, lists, mid-sentence quotes). A proper prosody-aware splitter would be better.

**Redis TTL management is annoying.** Session cleanup requires careful TTL configuration. I had a bug early on where abandoned sessions were accumulating and I didn't notice until the Redis memory started climbing.

**The interruption UX needs more work.** When the AI gets interrupted mid-thought, the resumed response sometimes sounds disconnected because the LLM doesn't have clean context on where it was. I want to explore "resumable generation" - giving the model its interrupted output as context when it resumes.

The Number That Mattered

After two weeks of optimization, Vetta.ai hit 740ms median latency on a warm server. Cold starts are around 1.1 seconds - still acceptable since those only happen on the first turn of a session.

More importantly: people who used it stopped noticing the AI. They just had the conversation.

That's the real benchmark.

Vetta.ai is live. If you want to try it, the link is here.`,
  },
  {
    slug: 'hft-matching-engine-reg-nms',
    title: 'I Built a High-Frequency Trading Matching Engine. Here\'s What I Learned.',
    date: 'October 2025',
    readingTime: '10 min read',
    content: `I want to be upfront: I am not a quant. I don't trade. I built this because I wanted to understand what "low latency" actually means when the stakes are real - when microseconds translate directly to money, and when the engineers who build these systems think about problems that most software developers never encounter.

The result was a REG-NMS compliant C++17 matching engine with ~230 microsecond order processing latency. This post is about what I built, why certain decisions matter at this scale, and the three things that surprised me most.

What a Matching Engine Actually Does

Before the architecture, the basics.

A matching engine sits at the heart of every exchange. When you place a buy order for 100 shares of AAPL at $180, that order enters the matching engine. The engine checks if there's a sell order at $180 or below. If yes, the trade executes. If no, your order joins the order book - a sorted list of all outstanding buy and sell orders - and waits.

Simple concept. The complexity is everything else:

- Orders must be matched in **price-time priority** (best price wins; equal prices matched in order of arrival)
- The system must handle tens of thousands of orders per second
- Every trade must be persisted durably (regulatory requirement)
- The order book state must be broadcast to market participants in real time
- The system must survive crashes without losing any orders

Each of these requirements is individually manageable. Getting all of them simultaneously while hitting microsecond latency targets is where it gets interesting.

The Architecture Decision That Everything Else Flows From

The most important architectural decision I made was this: **separate the hot path from everything else.**

The "hot path" is the sequence of operations that must complete before I can tell a client their order was accepted or matched. Everything on the hot path adds latency. Everything off the hot path doesn't.

In a naive implementation, the hot path looks like:

\`\`\`
Receive order → Match against book → Write to database → Broadcast to subscribers → Acknowledge
\`\`\`

The database write is the killer. Even a fast SSD write takes 50-200 microseconds. A network write to a subscriber takes similar time. If these are on the hot path, you'll never hit sub-millisecond latency.

My hot path is:

\`\`\`
Receive order → Match against book → Write to WAL buffer → Acknowledge
\`\`\`

That's it. The matching logic itself runs in memory against an in-memory order book. The WAL (Write-Ahead Log) write is to a memory-mapped file - not a network call, not a disk seek, just a memcpy into an mmap'd buffer that the kernel flushes asynchronously.

Everything else - flushing the WAL to disk, broadcasting Level 2 market data to WebSocket subscribers, updating aggregate statistics - happens on separate threads that don't block the matching loop.

The Order Book Data Structure

The order book is a sorted collection of price levels, where each price level contains a queue of orders at that price.

The obvious implementation is \`std::map<double, std::queue<Order>>\`. This works. It won't win any performance benchmarks.

The problem with \`std::map\` is cache behavior. A red-black tree stores nodes scattered across the heap. Traversing it means following pointers that are probably in different cache lines. At the volume of a real exchange, this pointer chasing becomes significant.

My implementation uses a custom price-indexed structure with a flat array for "active" price levels (prices with outstanding orders) and a hash map for O(1) lookup by price. The flat array enables cache-friendly iteration when sweeping through prices during matching.

For the order queue at each price level, I used a doubly-linked list rather than \`std::queue\`. This allows O(1) order cancellation by keeping a map from order ID to list iterator - critical because in real markets, a significant fraction of orders are cancelled before they execute.

\`\`\`cpp
struct PriceLevel {
    double price;
    std::list<Order> orders;
    uint64_t total_quantity;
};

struct OrderBook {
    // Bids sorted descending (highest first)
    std::map<double, PriceLevel, std::greater<double>> bids;
    // Asks sorted ascending (lowest first)
    std::map<double, PriceLevel> asks;
    // O(1) order lookup for cancellations
    std::unordered_map<uint64_t, std::list<Order>::iterator> order_index;
};
\`\`\`

Write-Ahead Logging and Crash Recovery

This was the part I was most nervous about getting right.

The WAL is a sequential log of every operation that affects the order book state. Before any state change is acknowledged, it's written to the WAL. This means if the process crashes, you can reconstruct the complete order book by replaying the WAL from the beginning.

My WAL uses memory-mapped I/O:

\`\`\`cpp
// Map 256MB of WAL file into virtual address space
void* wal_buffer = mmap(nullptr, WAL_SIZE,
                        PROT_READ | PROT_WRITE,
                        MAP_SHARED, wal_fd, 0);
\`\`\`

Writing a WAL entry is a \`memcpy\` into this buffer. The OS handles the actual disk flush via \`msync\` on a background thread. This is safe because the WAL is append-only - even if the OS crashes before flushing, we lose at most the last few milliseconds of orders, which is acceptable in the scenarios I was designing for.

Crash recovery replays WAL entries in sequence, rebuilding the order book state:

\`\`\`cpp
void recover_from_wal() {
    WALEntry* entry = (WALEntry*)wal_buffer;
    while (entry->sequence_number != 0) {
        apply_entry(entry);
        entry++;
    }
}
\`\`\`

I tested this by writing a test harness that randomly kills the process mid-operation and verifies that recovery produces a consistent order book. Getting this right took three days and two complete rewrites of the entry format.

The recovery of 100k+ log entries takes about 180ms on my test machine - fast enough to restart without significant downtime.

REG-NMS Compliance

REG-NMS (Regulation National Market System) is US securities law that governs how exchanges must handle orders. The relevant rule for a matching engine is the **Order Protection Rule**: you cannot execute a trade at a price inferior to a better price available on another exchange.

For a standalone matching engine, the practical implication is: when executing against the book, you must sweep through all available prices in strict priority order, and you must implement certain order types correctly.

I implemented:

**Market orders:** Execute immediately at best available price, sweeping through the book until filled or exhausted.

**Limit orders:** Execute only at specified price or better; remainder joins the book.

**Stop orders:** Dormant until a trigger price is reached, then convert to market order.

**Trailing stops:** The most complex - trigger price adjusts dynamically as the market moves in your favor, locks when market moves against you. Implementing this required a sorted index of trailing stop orders, updated on every price tick.

The trailing stop implementation took longer than everything else combined. The edge cases are numerous: What if the market gaps past the trigger? What if the order is partially filled when triggered? What if the trailing distance is larger than the current bid-ask spread?

The Three Things That Surprised Me

**1. Lock-free data structures are harder than they sound.**

I initially tried to use lock-free queues for the message passing between the matching loop and the WAL writer thread. After two weeks of intermittent bugs that disappeared under the debugger, I switched to a mutex-protected queue with a condition variable. The performance difference was negligible at my scale, and the correctness was immediate.

Lock-free programming requires a level of mental discipline around memory ordering that I'm not confident I had. For a hobby project, the "simple and correct" approach was the right call.

**2. The matching logic is not the bottleneck.**

I spent weeks optimizing the order book data structures. Profiling revealed that matching itself was about 20% of total hot-path time. The other 80% was serialization (converting orders to/from wire format) and the mmap write. The lesson: profile before you optimize.

**3. Latency and throughput are in tension.**

To minimize latency, you want to process each order immediately as it arrives. To maximize throughput, you want to batch operations (amortize serialization overhead, take fewer locks). A real production system has to make explicit decisions about where on this tradeoff curve to sit. I optimized for latency since that was the interesting constraint.

The Number

Median order processing latency: **~230 microseconds.**

For context, a human blink takes 150,000 microseconds. In the time it takes you to blink, this system could process approximately 650 orders.

Is 230µs competitive with real HFT systems? No. Production matching engines from major exchanges run in the single-digit microseconds range, using kernel bypass networking, custom hardware, and co-location. But for software running on a commodity server without any of that infrastructure, I'm reasonably happy with it.

More than the number, I'm happy with what I understand now that I didn't before: what it actually means to design for latency, why every data structure choice matters, and why the engineers who build these systems are so obsessive about the details.

The code is on GitHub at https://github.com/ngoyal88/REG-NMS-Matching-Engine`,
  },
  {
    slug: 'ai-api-calls-leaking-money-relay',
    title: 'Your AI API Calls Are Leaking Money. I Built a Fix',
    date: 'January 2026',
    readingTime: '7 min read',
    content: `Every team that seriously uses AI APIs hits the same wall eventually.

The OpenAI bill arrives and nobody knows which service caused the spike. A provider goes down and everything breaks. Someone on the team is making the same expensive LLM call hundreds of times because there's no shared cache. Rate limits get hit and requests just... fail.

The naive fix is to add a try/catch around your API calls and hope for the best. The real fix is to stop treating AI APIs like simple HTTP endpoints and start treating them like the external infrastructure dependencies they actually are - with all the resilience, observability, and cost management that implies.

That's why I built Relay: a reverse proxy and API gateway for AI services, written in Go. This post is the architecture walkthrough I wish had existed before I started.

The Core Idea: A Transparent Proxy

Relay sits between your application and OpenAI (or Anthropic, or any other provider). Your application thinks it's talking to OpenAI. Relay intercepts every request, does its work - caching, rate limiting, cost tracking, circuit breaking - then forwards to the real provider.

The key design constraint: **zero changes required in client code.** You just point your SDK at localhost:8080 instead of api.openai.com:

\`\`\`python
import openai
openai.api_base = "http://localhost:8080/v1"  # That's it
\`\`\`

Everything else continues working exactly as before. This constraint shaped every architectural decision.

The Middleware Chain

The heart of Relay is a layered middleware chain. In cmd/main.go, you can read the chain construction directly:

\`\`\`go
handler = middleware.TransformMiddleware(transformCfg)(handler)    // Layer A
handler = middleware.NewRateLimiter(rdb, cfgStore)(handler)        // Layer B
handler = middleware.CachingMiddleware(rdb)(handler)               // Layer C
handler = middleware.AuthMiddleware(rdb, true)(handler)            // Layer D
handler = middleware.RequestLoggingMiddleware(store, true)(handler) // Layer E
handler = middleware.TokenCostLogger(cfgStore)(handler)            // Layer F
handler = middleware.RequestLogger(handler)                        // Layer G
\`\`\`

This is standard Go middleware composition - each layer wraps the next, onion-style. A request enters at Layer G (outermost), passes through each layer in order, hits the proxy, and the response unwinds back through the same layers in reverse.

The order matters enormously. Auth (D) must run before logging (E) so we know who made the request when we log it. Caching (C) must run before the proxy so we can short-circuit before hitting the upstream. Cost tracking (F) must run before caching so we're counting tokens on every real request, not just cache misses.

Getting this order wrong produces subtle, hard-to-debug bugs. I got it wrong twice.

Caching: The Non-Obvious Parts

The caching middleware looks simple on the surface: hash the request body, check Redis, return cached response if found, otherwise proxy and cache the result.

\`\`\`go
hash := sha256.Sum256(bodyBytes)
key := fmt.Sprintf("cache:%s", hex.EncodeToString(hash[:]))
\`\`\`

SHA-256 of the request body is a reasonable cache key for LLM calls. Two requests with identical JSON bodies - same model, same messages, same parameters - will always produce the same hash. This catches the repeated identical calls that inflate costs.

The non-obvious part is **body handling in Go's http.Handler chain.**

r.Body is an io.ReadCloser - once you read it, it's gone. If the caching middleware reads the body to compute the hash, the proxy downstream gets an empty body and the upstream API call fails.

The fix is to read the bytes, then replace the body with a new reader over the same bytes:

\`\`\`go
bodyBytes, _ := io.ReadAll(r.Body)
r.Body = io.NopCloser(bytes.NewBuffer(bodyBytes)) // Refill
\`\`\`

Every middleware that reads the body does this. The cost tracking middleware does it. The request logging middleware does it. Miss this in any one place and you get mystifying empty-body errors that only appear in production.

The other non-obvious part: **async caching.** After a successful upstream response, Relay saves to Redis in a goroutine:

\`\`\`go
go func(k string, data []byte) {
    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
    defer cancel()
    rdb.Set(ctx, k, data, time.Hour)
}(key, spy.body.Bytes())
\`\`\`

This is deliberate. The user doesn't wait for Redis. If Redis is slow or temporarily unavailable, the user gets their response at normal speed and the cache just doesn't get populated for this request. Caching is an optimization, not a requirement - it should never add latency to the happy path.

Rate Limiting: Two Strategies

Rate limiting has an interesting constraint: it needs to work both with and without Redis.

Without Redis (single instance, local development): use Go's golang.org/x/time/rate package, which implements a token bucket in memory.

With Redis (distributed, multiple instances): use go-redis/redis_rate, which implements the same token bucket algorithm but backed by Redis, so all instances share the same limit state.

\`\`\`go
if rdb == nil {
    // In-memory limiter
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            if !limiter.Allow() {
                http.Error(w, "Too Many Requests", http.StatusTooManyRequests)
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}

// Distributed Redis limiter
redisLimiter := redis_rate.NewLimiter(rdb.Redis())
\`\`\`

The distributed case also sets a Retry-After header when a request is rejected, telling the client exactly how many seconds to wait before retrying. This is the correct HTTP behavior for 429 responses and most well-behaved API clients will honor it automatically.

One subtlety: the rate limit parameters come from cfgStore.Get() on every request, not cached at startup. This is intentional - hot reload (more on that shortly) needs rate limit changes to take effect immediately without restarting.

Circuit Breakers: Fail Fast, Recover Automatically

The circuit breaker pattern is essential for any proxy that forwards to external services. Without it, a slow or failing upstream makes every request wait for a timeout before failing - turning an upstream outage into a full system slowdown.

Relay uses Sony's gobreaker library, configured per-target:

\`\`\`go
cb := gobreaker.NewCircuitBreaker(gobreaker.Settings{
    Name:    fmt.Sprintf("target-%s", parsedURL.Host),
    Timeout: 30 * time.Second,
    ReadyToTrip: func(c gobreaker.Counts) bool {
        return c.ConsecutiveFailures >= 5
    },
})
\`\`\`

After 5 consecutive upstream failures, the circuit opens. For the next 30 seconds, all requests to that target immediately return 503 rather than waiting for a timeout. After 30 seconds, the circuit enters half-open state - it lets one request through as a probe. If that succeeds, the circuit closes and normal operation resumes. If it fails, the circuit opens again for another 30 seconds.

The circuit breaker wraps the proxy call and classifies responses:

\`\`\`go
_, err = cb.Execute(func() (interface{}, error) {
    proxy.ServeHTTP(rec, r)
    if rec.status >= 500 {
        return nil, fmt.Errorf("upstream error: %d", rec.status)
    }
    return nil, nil
})
\`\`\`

Only 5xx responses trip the breaker - 4xx responses (bad requests, auth errors) are client errors, not upstream failures, and shouldn't affect circuit state.

Hot Reload: Config Changes Without Downtime

One feature that turned out to be more useful than expected: configuration hot reload. Edit configs/config.yaml and changes take effect within seconds, with no restart required.

The implementation uses fsnotify via Viper:

\`\`\`go
v.WatchConfig()
v.OnConfigChange(func(e fsnotify.Event) {
    if err := refresh(v, store); err != nil {
        log.Printf("[CONFIG] reload failed: %v", err)
    } else {
        log.Printf("[CONFIG] reloaded from %s", e.Name)
    }
})
\`\`\`

The Store wraps the config with a read-write mutex so concurrent access during a reload is safe:

\`\`\`go
type Store struct {
    mu  sync.RWMutex
    cfg *Config
}

func (s *Store) Get() *Config {
    s.mu.RLock()
    defer s.mu.RUnlock()
    cpy := *s.cfg  // Return a copy
    return &cpy
}
\`\`\`

Returning a copy rather than a pointer to the internal config prevents callers from holding a reference to config that gets mutated during a reload. This is a subtle correctness issue - returning &s.cfg would be a data race waiting to happen.

The practical benefit: during a load spike, you can increase the rate limit ceiling by editing a YAML file. No deployment, no downtime, takes effect in under 5 seconds.

Cost Tracking: Counting Tokens Before They Happen

The cost tracking middleware estimates token counts and costs before the request hits the upstream. This is useful for logging, alerting, and quota management.

\`\`\`go
count, _ := ai.CountTokens(payload.Model, fullText)
cost := ai.EstimateCost(count, payload.Model, cfg.Models)
\`\`\`

Token counting uses the tiktoken-go library, which implements OpenAI's actual tokenizer. This is important - a naive character count would be significantly off (GPT tokenization is not character-based).

The model pricing lives in config.yaml:

\`\`\`yaml
models:
  gpt-4: 0.03
  gpt-3.5-turbo: 0.002
  claude-3-opus: 0.015
\`\`\`

Since pricing changes and new models appear regularly, keeping it in a hot-reloadable config file rather than hardcoded constants means updates don't require a deployment.

The token count and cost are stored in the request context so downstream middleware (logging, quota enforcement) can access them without recomputing:

\`\`\`go
ctx = context.WithValue(ctx, tokenCountContextKey, count)
ctx = context.WithValue(ctx, tokenCostContextKey, cost)
\`\`\`

The Load Balancer

For teams running multiple AI providers, Relay includes a load balancer with four strategies: round-robin, weighted, least-latency, and random.

The least-latency strategy is the most interesting. Each target maintains a sliding window of the last 100 response times:

\`\`\`go
type LatencyTracker struct {
    samples []time.Duration
    maxSize int
}
\`\`\`

On each request, the load balancer calculates average latency per target and routes to the fastest one. This naturally adapts to provider performance - if OpenAI is running slow and Anthropic is fast, traffic shifts to Anthropic automatically.

Combined with per-target circuit breakers, this means the load balancer both avoids slow targets and avoids dead ones.

What I'd Do Differently

**The Admin API is synchronous where it should be async.** The POST /admin/keys endpoint returns the key immediately, which means key creation latency is the Redis write latency. For a management API this is fine. But incrementing usage counts in auth.go is done with a goroutine-launched full get-modify-put cycle, which has a race condition: two concurrent requests with the same key could both read used: 5, both increment to used: 6, and both write back used: 6. The fix is a Redis INCR command instead of the get-modify-put pattern.

**Semantic caching is the highest-value missing feature.** Right now, caching is exact-match - the SHA-256 of the request body must match exactly. Two semantically identical questions ("What's 2+2?" and "What does 2+2 equal?") get separate upstream calls. Embedding-based similarity search would dramatically improve cache hit rate for conversational applications, but adds meaningful complexity (an embedding model, a vector index, a similarity threshold to tune).

**The transform middleware's JSON path implementation is fragile.** I implemented a simplified dot-notation path parser (messages.0.content) that doesn't handle arrays, nested structures, or edge cases well. A proper JSON pointer implementation (RFC 6901) would be more robust.

The Deployment Story

Relay ships as a single Go binary with a multi-stage Docker build. The final image is Alpine-based and weighs in under 20MB. The included docker-compose.yml gets you a full stack - Relay plus Redis - in one command:

\`\`\`bash
docker-compose up -d
\`\`\`

At that point, localhost:8080 is your AI gateway. Point your SDK there and you get caching, rate limiting, cost tracking, and circuit breaking for free.

The Number That Justified Building This

In testing, repeated identical queries against a warm cache resulted in 0ms upstream latency - the response came entirely from Redis. For applications with predictable query patterns (think: FAQ bots, code review tools, document summarizers), cache hit rates of 30-60% are realistic. At GPT-4 pricing, that's a meaningful cost reduction.

More than the cost savings, the observability alone is worth it. Knowing exactly how many tokens each service is consuming, which models are being called, and where latency is coming from - that information is genuinely hard to get from provider dashboards alone.

Relay is open source at https://github.com/ngoyal88/relay. Docker image available at https://hub.docker.com/r/ngoyal88/relay.`,
  },
]

export const socialLinks = [
  { name: 'github', href: 'https://github.com/ngoyal88' },
  { name: 'linkedin', href: 'https://linkedin.com/in/ngoyal88' },
  { name: 'leetcode', href: 'https://leetcode.com/u/ngoyal88' },
  { name: 'email', href: 'mailto:goyalnikhil883@gmail.com' },
]
