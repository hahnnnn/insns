import { ScrollAnimation } from "@/components/ScrollAnimation";
import Link from "next/link";

const readings = [
  {
    title: "The Society of the Spectacle",
    author: "Guy Debord",
    year: "1967",
    note: "On the separation and reunification of lived experience under late capitalism.",
    subjects: ["媒介理论", "景观", "情境主义"],
  },
  {
    title: "The Undercommons: Fugitive Planning & Black Study",
    author: "Fred Moten & Stefano Harney",
    year: "2013",
    note: "A study of the sociality of study, the undercommons, and the refusal of the professional-managerial class.",
    subjects: ["黑人性", "学院批判", "逃逸"],
  },
  {
    title: "The Stack: On Software and Sovereignty",
    author: "Benjamin Bratton",
    year: "2015",
    note: "On the accidental megastructure of planetary-scale computation.",
    subjects: ["基础设施", "软件", "主权"],
  },
  {
    title: "In the Shadows of the Digital Economy",
    author: "Robert Mejia",
    year: "2020",
    note: "The ghost work that sustains the platform economy.",
    subjects: ["数字劳动", "幽灵工作", "平台经济"],
  },
  {
    title: "Protocol: How Control Exists after Decentralization",
    author: "Alexander Galloway",
    year: "2004",
    note: "On protocol as a new form of power in networked societies.",
    subjects: ["协议", "控制", "去中心化"],
  },
  {
    title: "A Hacker Manifesto",
    author: "McKenzie Wark",
    year: "2004",
    note: "A vectoralist class analysis of information capitalism.",
    subjects: ["黑客", "信息资本主义", "向量学"],
  },
  {
    title: "Empire",
    author: "Michael Hardt & Antonio Negri",
    year: "2000",
    note: "On the global form of sovereignty that emerges from the decline of the nation-state.",
    subjects: ["帝国", "主权", "全球化"],
  },
  {
    title: "暗店街",
    author: "Patrick Modiano",
    year: "1978",
    note: "A novel about memory, identity, and the impossibility of recovering the past.",
    subjects: ["记忆", "身份", "文学"],
  },
  {
    title: "Slow Violence and the Environmentalism of the Poor",
    author: "Rob Nixon",
    year: "2011",
    note: "On the temporal and spatial dispersion of environmental violence.",
    subjects: ["环境", "暴力", "慢速"],
  },
];

const categories = [...new Set(readings.flatMap((r) => r.subjects))].sort();

export default function ReadingRoomPage() {
  return (
    <div className="page-container py-16 md:py-24">
      <div className="content-block">
        <ScrollAnimation>
          <h1 className="heading-xl mb-4">Reading Room</h1>
          <p className="body-text text-muted mb-8 max-w-[65ch]">
            A curated collection of readings that inform the Institute&apos;s thinking. These texts
            are not assigned — they are simply present, available for anyone who might find them useful.
          </p>
        </ScrollAnimation>

        {/* Subject tags */}
        <div className="tag-cloud mb-10">
          {categories.map((subject) => (
            <span key={subject} className="tag-pill">
              {subject}
            </span>
          ))}
        </div>

        <div className="space-y-0">
          {readings.map((reading, i) => (
            <ScrollAnimation key={i} delay={i * 0.04}>
              <div className="entry-row">
                <span className="entry-date">{reading.year}</span>
                <div className="entry-content">
                  <span className="text-sm font-medium">{reading.title}</span>
                  <p className="caption">{reading.author}</p>
                  <p className="caption text-muted mt-0.5">{reading.note}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {reading.subjects.map((subject) => (
                      <span key={subject} className="tag-pill">{subject}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  );
}
