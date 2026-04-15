import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const sampleArticles = [
  {
    title: "FG Approves N500bn for Infrastructure Development in Northern Nigeria",
    excerpt: "The Federal Government has approved a substantial budget allocation for critical infrastructure projects across northern states.",
    content: `The Federal Government has announced a significant N500 billion budget allocation for infrastructure development across northern Nigeria. This initiative aims to improve transportation networks, power supply, and water management systems in the region.

Speaking at a press conference in Abuja, the Minister of Works and Housing emphasized the government's commitment to bridging the infrastructure gap. The projects include the rehabilitation of major highways, construction of new power substations, and the installation of water treatment facilities.

"This investment will create thousands of jobs and stimulate economic growth in the northern region," the minister stated. The projects are expected to commence within the next quarter, with completion targeted for the next fiscal year.

State governments have been directed to establish implementation committees to oversee the execution of these projects. The federal government will provide technical support and monitoring to ensure transparency and accountability.`,
    category: "politics",
    authorName: "Chukwu Okafor",
    coverImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    published: true,
  },
  {
    title: "Nigerian Stock Exchange Hits Record High as Foreign Investors Return",
    excerpt: "The NSE All-Share Index reaches unprecedented levels amid renewed investor confidence and improved economic outlook.",
    content: `The Nigerian Stock Exchange (NSE) has reached a record high this week, with the All-Share Index climbing to 99,500 points. The surge reflects renewed confidence from both domestic and international investors in Nigeria's economic recovery.

Market analysts attribute the rally to several positive factors including improved inflation data, stronger naira performance, and increased foreign direct investment inflows. Major blue-chip stocks including Dangote Cement, MTN Nigeria, and Guaranty Trust Bank led the gains.

"We are seeing a fundamental shift in investor sentiment," said Tunde Adeyinka, Chief Investment Officer at a leading investment firm. "The combination of monetary policy stability and improved fiscal discipline is attracting capital back to the Nigerian market."

The telecommunications and financial services sectors showed particular strength, with several companies announcing record quarterly earnings. The Central Bank's efforts to stabilize the naira have also boosted investor confidence in the currency's stability.`,
    category: "business",
    authorName: "Amara Nwosu",
    coverImageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    published: true,
  },
  {
    title: "Super Eagles Secure Qualification to Africa Cup of Nations Final Tournament",
    excerpt: "Nigeria's national football team clinches spot in the upcoming Africa Cup of Nations with a commanding performance.",
    content: `Nigeria's Super Eagles have secured their qualification for the Africa Cup of Nations following a dominant 3-0 victory over their opponents in the final qualifying match. The team's impressive performance has sparked celebrations across the nation.

Goals from Victor Osimhen, Ahmed Musa, and Wilfred Ndidi sealed the victory, with the team displaying excellent coordination and attacking prowess. The Super Eagles finished at the top of their qualifying group with an impressive record.

Coach Finidi George praised the team's commitment and resilience throughout the qualifying campaign. "The players have shown great character and determination. We are confident going into the tournament," he said during the post-match interview.

The Super Eagles will now prepare for the Africa Cup of Nations, which will be held in early 2027. The team is expected to be among the favorites for the tournament, given their recent form and the quality of players in the squad.`,
    category: "sports",
    authorName: "Kunle Adebayo",
    coverImageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
    published: true,
  },
  {
    title: "Nollywood Breaks Box Office Records with New Blockbuster Film",
    excerpt: "A new Nigerian film shatters previous box office records, becoming the highest-grossing Nollywood production to date.",
    content: `A new Nollywood production has shattered box office records, becoming the highest-grossing Nigerian film in cinema history. The film, which premiered two weeks ago, has already accumulated over N3 billion in domestic box office revenue.

The film's success is attributed to its compelling storyline, stellar cast performances, and impressive production values. Director Kunle Afolayan's vision brought together some of Nigeria's finest actors and technical crew, resulting in a cinematic masterpiece.

"This success is a testament to the quality of Nigerian storytelling and the appetite of audiences for world-class entertainment," said the film's producer. The movie has also attracted international attention, with distribution deals already secured for several African countries.

The film's success is expected to boost investor confidence in the Nigerian film industry and encourage more substantial budget allocations for future productions. Several international streaming platforms have expressed interest in acquiring the film's rights.`,
    category: "entertainment",
    authorName: "Chioma Obi",
    coverImageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
    published: true,
  },
  {
    title: "Nigeria Launches Revolutionary AI-Powered Healthcare Platform",
    excerpt: "A Nigerian tech startup unveils an innovative artificial intelligence system designed to improve healthcare delivery across the nation.",
    content: `A Lagos-based technology company has launched a groundbreaking AI-powered healthcare platform designed to revolutionize medical service delivery in Nigeria. The platform uses advanced machine learning algorithms to diagnose diseases and recommend treatment options.

The system has been developed in collaboration with leading medical institutions and has undergone rigorous testing to ensure accuracy and reliability. Early trials have shown a 95% accuracy rate in disease diagnosis, significantly improving upon traditional methods.

"This platform will democratize access to quality healthcare, particularly in underserved communities," said the startup's CEO. The system can be accessed through mobile phones, making it available to millions of Nigerians without access to specialized medical facilities.

The Nigerian government has expressed strong support for the initiative and is exploring ways to integrate the platform into the national healthcare system. International health organizations have also shown interest in adopting the technology for use in other African countries.`,
    category: "technology",
    authorName: "Tunde Oladele",
    coverImageUrl: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800",
    published: true,
  },
  {
    title: "ECOWAS Summit Addresses Regional Security Challenges and Economic Integration",
    excerpt: "West African leaders gather to discuss pressing security issues and strengthen economic cooperation across the region.",
    content: `The Economic Community of West African States (ECOWAS) has convened a special summit in Accra to address mounting security challenges and accelerate regional economic integration. Leaders from 15 member states participated in the two-day meeting.

The summit focused on combating terrorism, human trafficking, and maritime piracy that continue to threaten regional stability. A comprehensive action plan was adopted, including enhanced intelligence sharing and coordinated military operations.

"Regional security is paramount to our collective prosperity," stated the ECOWAS Commission President. The leaders also discussed the implementation of the African Continental Free Trade Area (AfCFTA) and measures to facilitate cross-border trade.

Nigeria, as the largest economy in the region, played a key role in shaping the summit's outcomes. The country committed to increased investment in regional infrastructure and peacekeeping operations. The summit concluded with a commitment to reconvene quarterly to monitor progress on agreed initiatives.`,
    category: "world",
    authorName: "Adekunle Adebiyi",
    coverImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    published: true,
  },
  {
    title: "Central Bank Announces New Monetary Policy Framework to Combat Inflation",
    excerpt: "The CBN introduces a revised monetary policy approach aimed at stabilizing prices and supporting economic growth.",
    content: `The Central Bank of Nigeria (CBN) has announced a new monetary policy framework designed to address persistent inflation while supporting sustainable economic growth. The revised approach combines traditional policy tools with innovative market-based mechanisms.

The Governor of the CBN outlined the key components of the new framework, which includes adjusted interest rates, enhanced liquidity management, and targeted credit allocation to critical sectors. The policy aims to bring inflation down to single digits within the next 12 months.

"This framework reflects our commitment to price stability and sustainable economic development," the CBN Governor stated. The new policy is expected to improve the investment climate and attract both domestic and foreign capital.

Financial analysts have largely welcomed the announcement, noting that the policy strikes a balance between fighting inflation and supporting growth. The stock market responded positively to the announcement, with major indices gaining ground.`,
    category: "business",
    authorName: "Amara Nwosu",
    coverImageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    published: true,
  },
  {
    title: "Lagos State Launches Massive Urban Renewal Initiative",
    excerpt: "The state government unveils an ambitious plan to rehabilitate infrastructure and improve living conditions in major urban centers.",
    content: `Lagos State has launched a comprehensive urban renewal initiative aimed at transforming major urban centers and improving the quality of life for residents. The N200 billion project will focus on road rehabilitation, waste management, and public space development.

The Governor emphasized the government's commitment to making Lagos a world-class city. "This initiative will address decades of infrastructure deficit and position Lagos as Africa's leading city," he stated during the project launch.

The project will be executed in phases, with the first phase targeting major commercial districts and residential areas. Public-private partnerships will be leveraged to ensure efficient project delivery and maintenance.

Community stakeholders have been engaged in the planning process to ensure the project addresses their specific needs. The initiative is expected to create thousands of jobs and stimulate economic activity across the state.`,
    category: "politics",
    authorName: "Chukwu Okafor",
    coverImageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
    published: true,
  },
  {
    title: "Nigerian Tech Entrepreneur Wins International Innovation Award",
    excerpt: "A Lagos-based innovator receives global recognition for developing a sustainable solution to a critical development challenge.",
    content: `A Nigerian technology entrepreneur has won a prestigious international innovation award for developing a groundbreaking solution to improve agricultural productivity in sub-Saharan Africa. The award, presented at a global innovation summit, recognizes the entrepreneur's contribution to sustainable development.

The winning solution uses IoT sensors and AI analytics to provide farmers with real-time data on soil conditions, weather patterns, and optimal planting times. The technology has already been adopted by thousands of farmers across Nigeria and neighboring countries.

"This recognition validates our mission to leverage technology for social impact," said the award-winning entrepreneur. The solution has contributed to a 40% increase in crop yields among adopting farmers, significantly improving their livelihoods.

The entrepreneur plans to expand the platform to other African countries and is in discussions with international development organizations for funding. The award comes with a substantial cash prize that will be invested in research and development.`,
    category: "technology",
    authorName: "Tunde Oladele",
    coverImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    published: true,
  },
  {
    title: "Nigeria Hosts Continental Athletics Championship",
    excerpt: "The nation prepares to host Africa's premier athletics event, showcasing the continent's sporting talent.",
    content: `Nigeria will host the African Athletics Championship, one of the continent's most prestigious sporting events. The championship will bring together elite athletes from across Africa to compete in various track and field disciplines.

The event will be held in Lagos, with state-of-the-art facilities prepared to international standards. The Nigerian government has invested significantly in upgrading sports infrastructure to ensure the successful hosting of the championship.

"This championship will showcase Nigeria's sporting prowess and demonstrate our capability to host world-class events," said the Minister of Sports. The event is expected to attract thousands of spectators and generate significant economic activity.

Nigerian athletes are expected to perform strongly, with several world-class competitors competing across various categories. The championship will also serve as a qualifying event for the upcoming Olympic Games.`,
    category: "sports",
    authorName: "Kunle Adebayo",
    coverImageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
    published: true,
  },
];

async function seedDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection(process.env.DATABASE_URL);

    for (const article of sampleArticles) {
      const slug = article.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      const query = `
        INSERT INTO articles (title, slug, content, excerpt, category, coverImageUrl, authorName, published, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        content = VALUES(content),
        excerpt = VALUES(excerpt),
        category = VALUES(category),
        coverImageUrl = VALUES(coverImageUrl),
        authorName = VALUES(authorName),
        published = VALUES(published),
        updatedAt = NOW()
      `;

      await connection.execute(query, [
        article.title,
        slug,
        article.content,
        article.excerpt,
        article.category,
        article.coverImageUrl,
        article.authorName,
        article.published ? 1 : 0,
      ]);

      console.log(`✓ Seeded article: ${article.title}`);
    }

    console.log("\n✓ Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seedDatabase();
