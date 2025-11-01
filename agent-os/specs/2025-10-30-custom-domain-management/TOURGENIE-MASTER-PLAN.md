# TourGenie: Complete Product Specification

> **Last Updated:** October 30, 2025
> **Status:** Planning Phase - Ready for Implementation

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Vision](#product-vision)
3. [Tech Stack](#tech-stack)
4. [Architecture Overview](#architecture-overview)
5. [Core Features](#core-features)
6. [User Profile System](#user-profile-system)
7. [AI Trip Generation](#ai-trip-generation)
8. [Booking & Monetization](#booking--monetization)
9. [Trip Dashboard](#trip-dashboard)
10. [Feedback & Learning Loop](#feedback--learning-loop)
11. [Implementation Roadmap](#implementation-roadmap)
12. [Mobile App Strategy](#mobile-app-strategy)
13. [Revenue Model](#revenue-model)

---

## Executive Summary

**TourGenie** is an AI-powered travel planning platform that generates personalized trip itineraries using Amadeus travel data and monetizes through affiliate commissions (no direct booking = no customer service burden).

### Key Differentiators

- **Amadeus-powered search**: Best global coverage (including hidden gems)
- **AI personalization**: Learns from every trip to improve recommendations
- **Affiliate model**: Earn 8-40% commission without CS responsibility
- **Price comparison**: AI analyzes best deals across multiple platforms
- **Trip command center**: Track all bookings in one place, in-trip services

### Target Metrics (Year 1)

- **Revenue**: $150-200K (affiliate commissions)
- **Users**: 1,000 paying subscribers ($15-30/mo)
- **Conversions**: 8-12% (itinerary → booking)
- **AI Accuracy**: 90%+ user satisfaction

---

## Product Vision

### Mission

Enable anyone to discover and book their perfect vacation through AI-powered personalization, without the complexity of traditional travel planning.

### User Journey

1. **Prompt**: User describes dream trip in natural language
2. **AI Generation**: AI creates detailed itinerary using Amadeus data
3. **Verification**: User reviews checklist before booking
4. **Booking**: User books via affiliate links (partners handle CS)
5. **Trip Dashboard**: Track all bookings in one place
6. **In-Trip**: Access contextual services during travel
7. **Feedback**: Rate accuracy, AI learns for next trip

### Success Criteria

- 90%+ users rate itinerary as "Good" or "Perfect"
- 8-12% conversion rate (itinerary → booking)
- AI accuracy improves 10-20% per quarter
- $200+ average commission per booking

---

## Tech Stack

### MVP (Months 1-3)

```yaml
Frontend: Next.js 16 (App Router)
Backend: Payload CMS on Railway ($25/mo)
Database: MongoDB Atlas (free tier)
Auth: Better Auth
UI: shadcn/ui
Payments: Stripe (subscriptions)

# Travel APIs
Primary Search: Amadeus (flights, hotels, activities, POIs)
Affiliate Platforms:
  - Hotels: Booking.com API (25-40% commission)
  - Flights: Skyscanner (CPA $10-15) or Duffel
  - Activities: Viator (8-10% commission)

# AI
LLM: Claude 3.5 Sonnet (Vercel AI SDK)
Use cases:
  - User requirement analysis
  - Option selection from Amadeus results
  - Day-by-day itinerary generation
  - Deal analysis (price comparison)
  - Content generation

# Infrastructure
Hosting: Railway ($25/mo initially)
Files: S3 (optional - trip PDFs)
Queue: None initially (add SQS later if needed)
Monitoring: Sentry + PostHog

# Cost Structure
Per itinerary generation:
  - Amadeus API: $0.30-0.50
  - Claude API: $0.40-0.60
  - Total: $0.70-1.10 per itinerary

Revenue per booking:
  - Hotel: $600 avg (30% of $2,000)
  - Flight: $10 avg (CPA)
  - Activities: $32 avg (8% of $400)
  - Total potential: $642 per booking

Break-even: 0.17% conversion rate
Realistic: 5-10% conversion = massive margin
```

### Scale (Months 4+)

```yaml
# When ready to scale
Frontend: Next.js on Vercel
Admin: Payload on ECS Fargate
API: Lambda + API Gateway (SST)
Database: MongoDB Atlas (scaled)
Queue: SQS (for async operations)
Workflow: Step Functions (domain verification, etc.)
```

---

## Architecture Overview

### Data Flow

```
User Prompt
    ↓
1. AI Requirement Analyzer
   - Parses prompt
   - Extracts: destination, dates, budget, interests, companions
   - Validates inputs
    ↓
2. Amadeus Multi-Search (Parallel)
   - Flights: amadeus.shopping.flightOffers
   - Hotels: amadeus.shopping.hotelOffers
   - Activities: amadeus.shopping.activities
   - POIs: amadeus.referenceData.pointsOfInterest
    ↓
3. AI Option Selector
   - Reviews search results
   - Picks best options based on user profile
   - Considers: price, ratings, location, style match
    ↓
4. AI Itinerary Generator
   - Creates day-by-day plan
   - Narrative descriptions
   - Timing, logistics, budget breakdown
    ↓
5. Affiliate Link Enrichment
   - Match hotels to Booking.com
   - Match flights to Skyscanner/Duffel
   - Match activities to Viator
   - Generate tracking links
    ↓
6. Price Comparison (if multiple options)
   - AI analyzes best deal
   - Shows comparison table
   - Explains recommendation
    ↓
7. Present to User
   - Itinerary with booking options
   - Verification checklist
   - CS contact info for each platform
```

### Key Services

**Trip Generation Service**
- Orchestrates Amadeus searches
- Calls AI agents
- Enriches with affiliate links
- Stores in MongoDB

**Profile Service**
- Manages user preferences
- Tracks trip history
- Auto-updates from feedback
- Calculates personalization scores

**Booking Tracker**
- Tracks affiliate clicks
- Records conversions (postbacks)
- Updates trip dashboard
- Calculates commissions

**Feedback Service**
- Collects ratings (post-booking, mid-trip, post-trip)
- Analyzes patterns
- Updates AI prompts
- Generates improvement reports

---

## Core Features

### 1. AI Trip Generation

**Inputs:**
- User prompt (natural language)
- User profile (preferences, history)
- Travel companions (if any)
- Constraints (budget, dates, accessibility)

**Process:**
1. Analyze requirements with Claude
2. Search Amadeus (flights, hotels, activities, POIs)
3. AI selects best options
4. Generate day-by-day itinerary
5. Enrich with affiliate links
6. Price comparison across platforms
7. Present to user

**Outputs:**
- Detailed itinerary (day-by-day)
- Booking options for each item
- Price comparison tables
- Budget breakdown
- Booking verification checklist

**Key Algorithms:**

```typescript
// 1. Requirement Analysis
async function analyzePrompt(prompt: string, profile: UserProfile) {
  const requirements = await generateObject({
    schema: z.object({
      destination: z.string(),
      dates: z.object({ start: z.string(), end: z.string() }),
      budget: z.number(),
      travelers: z.object({ adults: z.number(), children: z.array() }),
      interests: z.array(z.string()),
      pace: z.enum(['relaxed', 'moderate', 'fast']),
      style: z.enum(['luxury', 'mid_range', 'budget']),
    }),
    prompt: `Extract structured data from: "${prompt}"
             Consider user profile: ${JSON.stringify(profile)}`
  })
  return requirements
}

// 2. Option Selection
async function selectBestOptions(amadeusResults, requirements, profile) {
  const selections = await generateObject({
    schema: z.object({
      flights: z.object({ outbound: z.string(), return: z.string() }),
      hotels: z.array(z.object({ hotelId: z.string(), nights: z.number() })),
      activities: z.array(z.object({ activityId: z.string(), day: z.number() })),
    }),
    prompt: `Select best options considering:
             - User budget: $${requirements.budget}
             - Travel style: ${profile.travelPreferences.style}
             - Top interests: ${profile.travelPreferences.interests}
             - Past trip feedback: ${profile.aiAccuracyProfile.strengths}
             - Avoid past mistakes: ${profile.aiAccuracyProfile.weaknesses}

             Available options:
             ${JSON.stringify(amadeusResults)}`
  })
  return selections
}

// 3. Affiliate Enrichment
async function enrichWithAffiliateLinks(selections, amadeusData) {
  return {
    hotels: await Promise.all(
      selections.hotels.map(async hotel => {
        const amadeusHotel = findById(amadeusData.hotels, hotel.hotelId)
        const bookingCom = await findOnBookingCom(amadeusHotel.name, amadeusHotel.city)
        const expedia = await findOnExpedia(amadeusHotel.name, amadeusHotel.city)

        return {
          ...amadeusHotel,
          bookingOptions: [
            bookingCom && {
              platform: 'Booking.com',
              url: generateAffiliateLink('booking', bookingCom.id),
              price: bookingCom.price,
              commission: '25-40%',
            },
            expedia && {
              platform: 'Expedia',
              url: generateAffiliateLink('expedia', expedia.id),
              price: expedia.price,
              commission: '4-6%',
            },
          ].filter(Boolean)
        }
      })
    ),
    // Similar for flights, activities
  }
}
```

### 2. Pre-Booking Verification Checklist

**Purpose:** Build user confidence before $4K purchase

**Features:**
- AI-generated personalized checklist
- Critical items (must verify): dates, location, price, travelers
- Important items (should verify): cancellation policy, amenities, room type
- Common mistakes highlighted
- Example screenshots where to find info
- Require all critical items checked before proceeding

**Example Output:**

```markdown
✓ Verify Before Booking
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 Critical - Must Verify (0 / 4)

☐ Check-in and Check-out Dates
  What to check: Verify dates are June 1-7, 2025 (6 nights)
  Where: Top of booking page
  Common mistakes:
    • Booking wrong month (June vs July)
    • Off by one day
    • Year confusion (2024 vs 2025)

☐ Hotel Location & Address
  What to check: Grand Hotel Rome at Via Vittorio Veneto 155
  Where: Below hotel name, click "View on Map"
  Common mistakes:
    • Similar hotel names
    • Wrong location (suburbs vs city center)

☐ Number of Guests
  What to check: Booking for 2 adults (as specified)
  Where: Room details section, "Occupancy"

☐ Total Price (Including All Fees)
  What to check: Final $1,850 (including taxes/fees)
  Where: Final checkout page
  Common mistakes:
    • Missing resort fees, parking, tourist taxes
    • Price changed since search
```

**Impact:** 2-3x conversion rate increase (5% → 12%)

### 3. Trip Dashboard (One-Stop Shop)

**Purpose:** Central hub for all trip bookings and services

**Features:**

**Before Trip:**
- Itinerary timeline (all bookings chronologically)
- Booking progress tracker (flights ✓, hotels ✓, activities ⚠️)
- Pre-trip checklist (passport, visas, vaccinations, packing)
- Weather forecast
- Local tips

**During Trip:**
- Current location context
- Upcoming events (next 24 hours)
- Last-minute activity bookings
- Restaurant reservations (OpenTable affiliate)
- Transportation (Uber/Lyft affiliate)
- Emergency contacts (local emergency, embassy, hotel)
- Travel insurance upsell

**After Trip:**
- Trip summary (where you went, what you did)
- Photo gallery upload
- Review prompts (earn credits)
- Trip report (shareable)
- Next trip suggestions

**Manual Booking Entry:**
- Users can add confirmations manually
- Track bookings from any platform
- Keep everything in one place

### 4. Price Comparison (AI-Powered)

**Purpose:** Build trust through transparency

**Process:**
1. Search multiple platforms (Amadeus, Booking.com, Expedia, Hotels.com)
2. Normalize results (different API formats)
3. AI analyzes best deal considering:
   - Total price (including fees)
   - Cancellation policy
   - Amenities included
   - Platform reputation
   - Customer reviews
4. Present comparison table with recommendation

**Example Output:**

```
💡 AI Price Analysis

🏆 Recommended: Booking.com
Saves $70 vs Expedia ($45 on room + $25 parking included)
Free cancellation until Jun 1 (most flexible)

┌─────────────┬─────────┬──────────────────┬─────────────┐
│ Platform    │ Price   │ Cancellation     │ Includes    │
├─────────────┼─────────┼──────────────────┼─────────────┤
│ Booking.com │ $1,850  │ Free until Jun 1 │ 🍳 🅿️ 📶  │
│ Expedia     │ $1,920  │ Non-refundable   │ 🍳 📶      │
│ Hotels.com  │ $1,895  │ Free until May 15│ 📶         │
└─────────────┴─────────┴──────────────────┴─────────────┘

Key insights:
• Booking.com includes free parking ($30/day value)
• All options have WiFi
• Expedia is non-refundable (risky!)
```

---

## User Profile System

### Data Model

```typescript
interface UserProfile {
  userId: string

  // Basic demographics (optional)
  demographics: {
    ageRange?: '25_34' | '35_44' | '45_54' | '55_64' | '65_plus'
    location?: { city: string, country: string }
    languages: string[] // ['en', 'es']
  }

  // Travel preferences
  travelPreferences: {
    style: ('luxury' | 'mid_range' | 'budget')[]
    pace: 'relaxed' | 'moderate' | 'fast_paced'

    // Interests (multi-select, weighted 1-3)
    interests: Array<{
      category: 'culture_history' | 'food_wine' | 'beaches' | 'nature_hiking' |
                'adventure_sports' | 'art_museums' | 'photography' | /* ... */
      weight: 1 | 2 | 3 // 1=somewhat, 3=very interested
    }>

    // Accommodation
    accommodation: {
      preferredTypes: ('hotel' | 'boutique' | 'resort' | 'vacation_rental')[]
      mustHaveAmenities: ('wifi' | 'parking' | 'pool' | 'kitchen')[]
      roomPreferences: { bedType?: 'king' | 'queen', view?: 'ocean' | 'city' }
    }

    // Dining
    dining: {
      dietaryRestrictions: ('vegetarian' | 'vegan' | 'gluten_free' | 'none')[]
      cuisinePreferences: string[] // ['italian', 'japanese', 'local']
      allergies?: string[]
    }

    // Activities
    activities: {
      physicalActivityLevel: 'low' | 'moderate' | 'high'
      preferredActivities: ActivityType[]
      accessibility: {
        wheelchairAccessRequired?: boolean
        mobilityAid?: boolean
      }
    }

    // Budget
    typicalBudget: {
      perDay: number
      currency: string
      flexibility: 'strict' | 'flexible'
    }
  }

  // Travel companions
  travelCompanions: Array<{
    id: string
    relationship: 'spouse' | 'partner' | 'child' | 'friend'
    linkedUserId?: string // If they have TourGenie account
    name: string
    ageGroup?: 'infant' | 'toddler' | 'child' | 'teen' | 'adult'
    age?: number
    interests?: string[]
    dietaryRestrictions?: string[]
    usuallyTravelsWith: boolean
  }>

  // Learned from trips
  tripHistory: {
    totalTrips: number
    destinations: Array<{
      location: string
      visitedAt: Date
      rating: number
      wouldRevisit: boolean
    }>
    favoriteDestinations: string[]
    favoriteActivityTypes: ActivityType[]
    averageTripLength: number
    typicalBudget: number
    preferredSeasons: string[]
  }

  // AI accuracy tracking
  aiAccuracyProfile: {
    averageRating: number
    totalRatings: number
    strengths: string[] // What AI gets right for this user
    weaknesses: string[] // What AI gets wrong
  }

  // Metadata
  profileCompleteness: number // 0-100%
  lastUpdated: Date
}
```

### Progressive Profile Building

**Stage 1: Onboarding (2 minutes, 4-5 questions)**
- Travel style (luxury/comfort/budget)
- Top 3-5 interests
- Traveling with (solo/couple/family/friends)
- Kids details (if family)
- Dietary restrictions (optional)

**Stage 2: During Trip Planning (contextual, 5-10 questions)**
- Accommodation preferences
- Physical activity level
- Pacing preference
- Budget per day
- Specific interests for this trip

**Stage 3: Automatic Learning (post-trip)**
- Extract from ratings/feedback
- Update favorite destinations
- Learn activity preferences
- Adjust budget based on actual spending
- Identify what AI got right/wrong

### Companion Management

**Add Companions:**
- Name, relationship, age
- Their interests (if known)
- Dietary restrictions
- Accessibility needs
- Link to their TourGenie account (if they have one)

**Linked Accounts:**
- Family/friends with TourGenie accounts
- Share preferences (with permission)
- Collaborative trip planning
- Merge preferences when planning together
- Notify companions when included in trip

**AI Personalization:**
- Factor in all companions' needs
- Age-appropriate activities for kids
- Accessible venues for mobility aids
- Accommodate dietary restrictions
- Balance everyone's interests

---

## AI Trip Generation

### Multi-Agent System

**Agent 1: Requirement Analyzer**
```
Input: User prompt + profile
Output: Structured requirements

Schema:
- destination: string
- dates: { start, end }
- budget: number
- travelers: { adults, children[] }
- interests: string[]
- pace: enum
- style: enum
- specialRequirements: string[]
```

**Agent 2: Option Selector**
```
Input: Amadeus results + requirements + profile
Output: Selected options

Schema:
- flights: { outbound, return, reasoning }
- hotels: [{ hotelId, nights, reasoning }]
- activities: [{ activityId, day, reasoning }]

Considers:
- User budget (strict constraint)
- Past trip feedback (learn from mistakes)
- Travel companions (age-appropriate, accessible)
- Interests (weighted by importance)
- Style/pace preferences
```

**Agent 3: Itinerary Generator**
```
Input: Selected options + requirements
Output: Day-by-day itinerary

Schema:
- dayByDay: [{
    day: number,
    date: string,
    location: string,
    activities: [{ time, name, duration, why }],
    meals: [{ time, restaurant, cuisine, why }],
    accommodation: string,
    notes: string
  }]
- budgetBreakdown: { flights, hotels, activities, food, transport }
- packingList: string[]
- tips: string[]
```

**Agent 4: Deal Analyzer** (if multiple booking options)
```
Input: Booking options from multiple platforms
Output: Best deal analysis

Schema:
- bestOption: string (platform name)
- reasoning: string
- priceComparison: { cheapest, mostFlexible, bestValue }
- insights: string[]
```

### Prompt Engineering Patterns

**Use User Profile:**
```
CRITICAL USER PREFERENCES:
- Budget: $${profile.budget} (${profile.flexibility})
- Style: ${profile.style}
- Pace: ${profile.pace}
- Top interests: ${profile.interests.filter(i => i.weight === 3)}
- Must avoid: ${profile.activities.avoidActivities}

PAST TRIP LEARNINGS:
- What works: ${profile.aiAccuracyProfile.strengths}
- What doesn't: ${profile.aiAccuracyProfile.weaknesses}
- ⚠️ CRITICAL: Don't repeat past mistakes!

COMPANIONS:
${profile.companions.map(c => `
  - ${c.relationship} (${c.ageGroup}, age ${c.age})
    Interests: ${c.interests}
    Dietary: ${c.dietaryRestrictions}
    Accessibility: ${c.accessibility}
`)}

INSTRUCTIONS:
1. Stay within budget (this is non-negotiable)
2. Match user's style and pace
3. Prioritize high-weight interests
4. Accommodate all companions
5. Learn from past feedback
6. Explain your reasoning
```

**Validation Layer:**
```typescript
// Validate AI output before saving
function validateItinerary(itinerary, requirements, profile) {
  const errors = []

  // Budget check
  if (itinerary.totalCost > requirements.budget * 1.1) {
    errors.push(`Over budget by ${itinerary.totalCost - requirements.budget}`)
  }

  // Activity level check
  const activitiesPerDay = itinerary.dayByDay.map(d => d.activities.length)
  if (profile.pace === 'relaxed' && Math.max(...activitiesPerDay) > 3) {
    errors.push('Too many activities for relaxed pace')
  }

  // Companion accommodation check
  if (profile.companions.some(c => c.ageGroup === 'infant' || c.ageGroup === 'toddler')) {
    const hasStrollerAccess = itinerary.dayByDay.every(d =>
      d.activities.every(a => a.strollerAccessible)
    )
    if (!hasStrollerAccess) {
      errors.push('Not all activities are stroller-accessible')
    }
  }

  // Dietary restrictions check
  const restrictions = [
    ...profile.dining.dietaryRestrictions,
    ...profile.companions.flatMap(c => c.dietaryRestrictions || [])
  ]
  if (restrictions.length > 0) {
    const mealsWithRestrictions = itinerary.dayByDay.flatMap(d => d.meals)
      .filter(m => m.accommodatesRestrictions)
    if (mealsWithRestrictions.length < itinerary.dayByDay.length * 2) {
      errors.push('Not all meals accommodate dietary restrictions')
    }
  }

  return errors
}
```

---

## Booking & Monetization

### Affiliate Link Strategy

**Amadeus (Search) → Affiliate Platforms (Booking)**

```typescript
// 1. Search with Amadeus
const amadeusResults = await amadeus.shopping.hotelOffers.get({
  cityCode: 'ROM',
  checkInDate: '2025-06-01',
  checkOutDate: '2025-06-07',
})

// 2. Match to affiliate platforms
const enriched = await Promise.all(
  amadeusResults.data.map(async hotel => {
    // Find on Booking.com
    const bookingCom = await bookingComAPI.search({
      dest_id: getCityId('ROM'),
      search_terms: hotel.name,
    })

    // Fuzzy match by name + address
    const match = bookingCom.results.find(h =>
      stringSimilarity(h.hotel_name, hotel.name) > 0.8 &&
      addressesMatch(h.address, hotel.address)
    )

    return {
      ...hotel, // Amadeus data (search source)
      bookingOptions: match ? [{
        platform: 'Booking.com',
        url: generateAffiliateLink('booking', match.hotel_id, {
          checkin: '2025-06-01',
          checkout: '2025-06-07',
          affiliate_id: process.env.BOOKING_AFFILIATE_ID
        }),
        price: match.price || hotel.offers[0].price.total,
        commission: '25-40%',
        customerService: 'booking.com/help',
      }] : []
    }
  })
)
```

**Affiliate Platforms:**

| Type | Platform | Commission | Notes |
|------|----------|------------|-------|
| Hotels | Booking.com | 25-40% | Best rates, flexible cancellation |
| Hotels | Expedia | 4-6% | Backup option |
| Flights | Skyscanner | $10-15 CPA | Per booking, not percentage |
| Flights | Duffel | 2-3% | If they have affiliate program |
| Activities | Viator | 8-10% | 300K+ activities worldwide |
| Activities | GetYourGuide | 8% | Good European coverage |
| Restaurants | OpenTable | $1-2 | Per reservation |

**Tracking & Conversion:**

```typescript
// When user clicks affiliate link
async function trackAffiliateClick(tripId, bookingType, platform) {
  const click = await AffiliateClick.create({
    tripId,
    bookingType, // 'flight' | 'hotel' | 'activity'
    platform,
    timestamp: new Date(),
    userId: req.user.id,
  })

  // Analytics
  await analytics.track({
    userId: req.user.id,
    event: 'Affiliate Link Clicked',
    properties: { tripId, bookingType, platform }
  })

  return click.id
}

// When platform notifies of conversion (postback URL)
app.post('/api/affiliate/conversion', async (req, res) => {
  const { transactionId, amount, commission } = req.body

  // Find original click
  const click = await AffiliateClick.findOne({
    platformTransactionId: transactionId
  })

  if (click) {
    // Record conversion
    await Conversion.create({
      clickId: click.id,
      tripId: click.tripId,
      bookingAmount: amount,
      commissionEarned: commission,
    })

    // Update trip
    await Trip.updateOne(
      { _id: click.tripId },
      {
        $inc: { totalCommissionEarned: commission },
        $set: { [`bookingStatus.${click.bookingType}`]: true }
      }
    )
  }

  res.json({ success: true })
})
```

### Customer Service Strategy

**TourGenie does NOT handle CS for bookings.**

**Clear Communication:**
- Pre-booking: "You'll book on Booking.com - they handle all customer service"
- Each booking option: Shows CS contact info
- FAQ section: Explains who to contact for what
- Help section: Guide users to right CS channel

**What TourGenie Provides:**
- Guide to CS contacts
- Help understanding booking terms
- Emergency contacts (during trip)
- Suggest alternatives if plans change
- Re-plan if trip needs adjustment

**What TourGenie Does NOT Do:**
- Modify bookings
- Process refunds
- Handle disputes
- Resolve booking errors
- Provide 24/7 emergency support

### Revenue Model

**Subscription (Predictable MRR):**
- Free: 1 itinerary/month, uifoundry.dev subdomain only
- Starter ($15/mo): Unlimited itineraries, trip tracking
- Pro ($30/mo): 3 concurrent trips, priority support, advanced features

**Affiliate Commissions (High Margin):**
- Hotels: $600 avg per booking (30% of $2,000)
- Flights: $10 avg per booking (CPA)
- Activities: $32 avg per booking (8% of $400)
- **Total per trip: $642 average**

**Example Economics:**
```
1,000 itineraries/month:
- Subscriptions: $15,000 (1,000 × $15)
- Conversions: 100 bookings (10% rate)
- Commission: $64,200 (100 × $642)
- Total revenue: $79,200/month

Costs:
- Amadeus/Claude API: $1,100 (1,000 × $1.10)
- Infrastructure: $500
- Total costs: $1,600

Net profit: $77,600/month = $931K/year
```

**Break-even:** Need 0.17% conversion rate (1 booking per 580 itineraries)
**Realistic:** 5-10% conversion = massive profit margin

---

## Feedback & Learning Loop

### Three-Stage Feedback System

**Stage 1: Post-Booking (Immediate)**
```
Modal after user returns from booking platform:

"Quick Question: How accurate was the AI?"

[Perfect Match] [Pretty Good] [Okay] [Not Great]

If "Perfect":
  ✓ What did AI get right?
  - Perfect location
  - Right price point
  - Matched my style
  - Good reviews

If "Not Great":
  ✗ What went wrong?
  - Wrong location
  - Too expensive
  - Didn't match style
  - Better options available

  [Detailed feedback box]

  💡 Thanks! Here's $10 credit for next itinerary.
```

**Stage 2: Mid-Trip (2-3 days into trip)**
```
Email/push notification:

"How's your trip going?"

• Itinerary pacing: [Too rushed] → [Perfect] → [Too slow]
• Which activities did you love? [Thumbs up/down each]
• Did you make any changes? [Free text]
• Any issues or surprises? [Checklist + free text]
```

**Stage 3: Post-Trip (2-3 days after return)**
```
Comprehensive survey:

1. Overall rating: ⭐⭐⭐⭐⭐
2. Would you use TourGenie again? [Definitely/Probably/Maybe/No]
3. Accuracy breakdown:
   - Hotels: [Perfect/Good/Okay/Poor]
   - Activities: [Perfect/Good/Okay/Poor]
   - Pacing: [Perfect/Rushed/Slow]
   - Budget: [Spot on/Close/Off/Very off]
   - Actual spent: $____
4. What would you change?
5. What surprised you (good or bad)?
6. Testimonial request (if positive)
7. Photo upload (optional)
```

### Auto-Learning System

```typescript
// Update profile from feedback
async function updateProfileFromFeedback(userId, tripId, feedback) {
  const trip = await Trip.findById(tripId)
  const profile = await UserProfile.findOne({ userId })

  // Update trip history
  await UserProfile.updateOne(
    { userId },
    {
      $inc: { 'tripHistory.totalTrips': 1 },
      $push: {
        'tripHistory.destinations': {
          location: trip.destination,
          rating: feedback.overallStars,
          wouldRevisit: feedback.wouldRecommend,
        }
      }
    }
  )

  // Learn activity preferences
  if (feedback.activitiesLoved?.length > 0) {
    const activityTypes = extractActivityTypes(feedback.activitiesLoved)
    await UserProfile.updateOne(
      { userId },
      {
        $addToSet: {
          'tripHistory.favoriteActivityTypes': { $each: activityTypes }
        }
      }
    )

    // Increase interest weights for related categories
    for (const type of activityTypes) {
      const relatedInterest = mapActivityTypeToInterest(type)
      await UserProfile.updateOne(
        { userId, 'travelPreferences.interests.category': relatedInterest },
        { $inc: { 'travelPreferences.interests.$.weight': 1 } }
      )
    }
  }

  // Learn what went wrong
  if (feedback.accuracyBreakdown.hotels === 'poor') {
    await UserProfile.updateOne(
      { userId },
      {
        $addToSet: { 'aiAccuracyProfile.weaknesses': 'hotel selection' },
        $pull: { 'aiAccuracyProfile.strengths': 'hotel selection' }
      }
    )

    if (feedback.improvements.includes('wrong location')) {
      await UserProfile.updateOne(
        { userId },
        { $addToSet: { 'aiAccuracyProfile.weaknesses': 'wrong hotel neighborhood' } }
      )
    }
  }

  // Update budget (moving average)
  if (feedback.actualSpent) {
    const perDay = feedback.actualSpent / trip.duration
    const newBudget = (profile.budget * 0.7) + (perDay * 0.3)
    await UserProfile.updateOne(
      { userId },
      { $set: { 'travelPreferences.typicalBudget.perDay': Math.round(newBudget) } }
    )
  }
}
```

### Prompt Improvement Loop

```typescript
// Weekly: Analyze feedback and improve prompts
async function improveAIPrompts() {
  // Get recent poor ratings
  const poorRatings = await BookingFeedback.find({
    initialRating: { $in: ['okay', 'poor'] },
    createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
  })

  // Extract common issues
  const issues = analyzeCommonIssues(poorRatings)

  // Example issues:
  // - "Hotel in wrong neighborhood" (15 mentions)
  //   → Add to prompt: "CRITICAL: Verify hotel is in [neighborhood], not suburbs"
  //
  // - "Too expensive for budget" (12 mentions)
  //   → Add to prompt: "User budget is $X. Do NOT exceed. Select hotels under $Y/night."
  //
  // - "Didn't match style - too fancy" (8 mentions)
  //   → Add to prompt: "User prefers [casual/luxury]. Match hotel vibe closely."

  // Update prompts for high-frequency issues
  for (const issue of issues) {
    if (issue.frequency > 10) {
      await updatePromptWithFix(issue)
      await notifySlack(`🔧 Updated AI prompt to fix: ${issue.description}`)
    }
  }
}
```

---

## Implementation Roadmap

### Platform Strategy: Web-First, Mobile Later

**Start with Next.js web app, then add React Native mobile app for "on-the-go" features.**

**Rationale:**
- **Trip planning happens on desktop** - Users research destinations, compare prices, and book on larger screens (60% desktop traffic)
- **Mobile shines during travel** - GPS, offline access, notifications most valuable while traveling
- **Faster to market** - Ship web MVP in 8 weeks vs 16+ weeks if learning React Native first
- **Validate first** - Prove concept with web before investing in mobile development
- **Code reuse** - 60-70% of code can be shared (types, API clients, business logic)

### Phase 1: MVP - Web App (Weeks 1-8)

**Week 1-2: Foundation**
- ✅ Next.js 16 + Payload CMS setup
- ✅ MongoDB + Better Auth
- ✅ Basic UI (shadcn)
- ✅ User profile schema
- ✅ Stripe subscriptions

**Week 3-4: Amadeus Integration**
- ✅ Amadeus API setup (OAuth)
- ✅ Hotel search
- ✅ Flight search
- ✅ Activities search
- ✅ POI search
- ✅ Response parsing + validation

**Week 5-6: AI Trip Generation**
- ✅ Requirement analyzer (Claude)
- ✅ Option selector (Claude)
- ✅ Itinerary generator (Claude)
- ✅ Database storage
- ✅ Basic UI for itineraries

**Week 7-8: Affiliate Links + Launch**
- ✅ Booking.com affiliate integration
- ✅ Skyscanner/Viator links
- ✅ Affiliate click tracking
- ✅ Pre-booking checklist
- ✅ Landing page
- ✅ Soft launch (no marketing)

**Deliverable:** Users can generate AI itineraries with real prices and book via affiliate links.

**Metrics to track:**
- Itineraries generated
- Click-through rate (itinerary → affiliate link)
- Conversion rate (affiliate click → booking)
- User ratings (accuracy)

### Phase 2: Feedback & Iteration (Weeks 9-12)

**Week 9-10: Feedback System**
- ✅ Post-booking rating modal
- ✅ Feedback database schema
- ✅ Analytics dashboard
- ✅ Auto-update profiles from feedback

**Week 11-12: Trip Dashboard**
- ✅ Timeline view (all bookings)
- ✅ Manual booking entry
- ✅ Booking progress tracker
- ✅ Basic in-trip features (emergency contacts, weather)

**Deliverable:** Complete feedback loop, users can track bookings.

**Metrics to track:**
- Feedback response rate
- Average accuracy rating
- Common issues identified
- Profile completeness

### Phase 3: Price Comparison + Polish (Weeks 13-16)

**Week 13-14: Multi-Platform Search**
- ✅ Add Expedia API
- ✅ Add Hotels.com API
- ✅ Price comparison algorithm
- ✅ AI deal analyzer

**Week 15-16: Polish**
- ✅ Onboarding flow
- ✅ Profile completeness gamification
- ✅ Email notifications
- ✅ Performance optimization
- ✅ Bug fixes

**Deliverable:** Price comparison working, polished MVP.

### Phase 4: Mobile App (Weeks 17-20)

**React Native + Expo - Focus on "During Trip" Features**

**Week 17-18: Mobile Foundation**
- ✅ Expo app setup (managed workflow)
- ✅ Monorepo structure (share code with web)
- ✅ Better Auth integration (mobile)
- ✅ tRPC client setup
- ✅ Basic navigation (expo-router)
- ✅ Share UI components from web (rn-primitives)

**Week 19-20: Mobile-Specific Features**
- ✅ Offline itinerary viewer (store in device storage)
- ✅ GPS-based "near me" suggestions
- ✅ Push notifications (flight delays, activity reminders)
- ✅ Camera integration (photo uploads for feedback)
- ✅ Apple/Google Wallet passes (for bookings)
- ✅ Emergency contacts quick access
- ✅ Real-time location context

**Deliverable:** Mobile app with native features for during-trip use.

**What to Build:**
- Offline-first itinerary (trip is saved locally)
- GPS-based contextual suggestions ("What's near me?")
- Real-time notifications (flight status, activity reminders)
- Quick photo capture (for feedback, memories)
- Emergency info (local emergency numbers, embassy, hotel)
- Fast access to upcoming events (next 24 hours)

**What NOT to Build (Use Web):**
- Trip generation (complex, better on desktop)
- Price comparison (users do this at home)
- Profile editing (better with keyboard)
- Complex forms (booking details, preferences)

**Code Sharing Strategy:**

```
tourgenie/
├── apps/
│   ├── web/                    # Next.js (Phase 1)
│   │   └── app/
│   └── mobile/                 # React Native Expo (Phase 4)
│       └── app/
├── packages/
│   ├── ui/                     # Shared components (95% reuse)
│   │   ├── TripCard.tsx       # Works on both platforms
│   │   └── Button.tsx         # rn-primitives for mobile
│   ├── api-client/             # tRPC client (100% reuse)
│   ├── types/                  # TypeScript types (100% reuse)
│   ├── amadeus/                # Amadeus API wrapper (100% reuse)
│   └── auth/                   # Better Auth client (95% reuse)
└── services/
    └── backend/                # PayloadCMS + API routes
```

**Expected Code Reuse:** 60-70% of business logic, types, API clients

### Phase 5: Scale & Growth (Months 5-7)

**Month 4: In-Trip Services**
- ✅ Last-minute activity bookings
- ✅ Restaurant reservations (OpenTable)
- ✅ Transportation integrations (Uber/Lyft)
- ✅ Travel insurance upsell

**Month 5: Advanced Features**
- ✅ Mid-trip check-in survey
- ✅ Post-trip comprehensive review
- ✅ Testimonial collection
- ✅ Photo uploads

**Month 6: Marketing & Scale**
- ✅ Product Hunt launch
- ✅ Content marketing (blog posts, case studies)
- ✅ SEO optimization
- ✅ Referral program
- ✅ Migrate to AWS (if needed for scale)

### Phase 5: Direct Booking (Optional, 6+ months)

**Only add if:**
- ✅ Earning $10K+/month in affiliate commissions
- ✅ Understand common CS issues
- ✅ Have VA/support team ready
- ✅ Have E&O insurance
- ✅ Tested booking APIs thoroughly

**Features:**
- One-click booking via Duffel (flights) or Amadeus (hotels)
- Payment processing
- Confirmation emails
- Customer service infrastructure
- 24/7 support (outsourced)

---

## Key Design Decisions

### Why Amadeus for Search?

**Pros:**
- Best global coverage (including hidden gems)
- Most comprehensive data (260+ cities, all major destinations)
- More results for non-major locations
- Better for "off the beaten path" recommendations

**Cons:**
- More complex API (steeper learning curve)
- Higher integration time (3-4 weeks vs 1-2 weeks for Duffel)
- Documentation gaps

**Decision:** Worth the extra complexity for product differentiation.

### Why Affiliate Model (Not Direct Booking)?

**Pros:**
- Zero customer service burden (platforms handle it)
- No liability (booking errors, cancellations, disputes)
- Higher margins (25-40% commission vs 10-15% booking fee)
- Faster to market (no booking infrastructure)
- Time to learn the business (before taking on CS)

**Cons:**
- Lower control over user experience
- Dependent on affiliate platforms
- Commission rates can change
- Tracking can be imperfect

**Decision:** Start with affiliates for MVP, add direct booking in Phase 5+ if needed.

### Why Railway (Not Lambda) for MVP?

**Pros:**
- Payload CMS works perfectly (no cold start issues)
- Faster development (no serverless complexity)
- Cheaper initially ($25/mo vs $50-100/mo for AWS)
- Can migrate to Lambda later if needed

**Cons:**
- Always running (not "serverless")
- Less auto-scaling
- More expensive at very high scale

**Decision:** Ship fast with Railway, migrate to Lambda when scaling requires it.

### Why Not Multi-Site/RBAC in MVP?

**Scope:**
- TourGenie is single-user focused (personal trips)
- Don't need multi-tenancy (unlike UIFoundry)
- RBAC not relevant (no team collaboration initially)

**Decision:** Skip multi-site architecture, focus on core trip planning.

---

## Success Metrics

### North Star Metric
**Successful trips planned** (user creates itinerary → books → completes trip → rates 4+ stars)

### Key Metrics

**Acquisition:**
- New signups/week
- Activation rate (signup → first itinerary)
- Cost per acquisition

**Engagement:**
- Itineraries generated per user
- Time spent planning
- Profile completeness rate

**Monetization:**
- Subscription conversion rate (free → paid)
- Affiliate click-through rate
- Booking conversion rate (itinerary → booking)
- Average commission per booking
- MRR / ARR

**Retention:**
- User retention (1 month, 3 months, 6 months)
- Repeat trip planning rate
- Churn rate

**Quality:**
- AI accuracy rating (1-5 stars)
- "Perfect match" rate (% rated "perfect")
- Would use again rate
- NPS (Net Promoter Score)

### Target Benchmarks (Year 1)

| Metric | Target |
|--------|--------|
| Active users | 1,000 |
| Paying subscribers | 500 |
| MRR | $7,500 (subscriptions) |
| Itineraries/month | 1,000 |
| Booking conversion | 8-12% |
| Bookings/month | 100 |
| Avg commission/booking | $600 |
| Commission revenue/month | $60,000 |
| Total revenue/month | $67,500 |
| Annual revenue | $810,000 |
| AI accuracy | 90%+ |
| NPS | 50+ |

---

## Risk Mitigation

### Technical Risks

**Risk: Amadeus API downtime**
- Mitigation: Fallback to Booking.com/Expedia APIs for search
- Cache common searches in Redis
- Show cached results if Amadeus unavailable

**Risk: AI generates poor recommendations**
- Mitigation: Validation layer (budget, pacing, accessibility checks)
- User verification checklist before booking
- Learn from feedback to improve prompts
- Manual review for first 100 trips

**Risk: Affiliate tracking fails**
- Mitigation: Use multiple tracking methods (cookies, postbacks, server-to-server)
- Store click data even if conversion tracking fails
- Manual reconciliation with affiliate dashboards
- Build relationships with affiliate managers

### Business Risks

**Risk: Low conversion rates**
- Mitigation: Price comparison builds trust
- Verification checklist builds confidence
- Start with low-risk free tier
- Referral program for word-of-mouth

**Risk: Affiliate commission changes**
- Mitigation: Diversify across multiple platforms
- Build relationships with multiple networks
- Consider direct booking as backup (Phase 5)
- Track economics closely

**Risk: Competitive pressure**
- Mitigation: Focus on personalization (learning loop)
- Niche down (off-the-beaten-path travelers)
- Build community (user-generated content, photos)
- Fast iteration based on feedback

### Legal Risks

**Risk: Users blame TourGenie for booking issues**
- Mitigation: Clear disclaimers throughout
- "Booking platform handles CS" messaging
- Terms of Service protect TourGenie
- Guide users to correct CS channels

**Risk: Data privacy concerns**
- Mitigation: GDPR-compliant data handling
- Clear privacy policy
- User controls for data sharing
- Minimal data collection initially

---

## Mobile App Strategy

### Why Mobile Matters

**Use Case Analysis:**

**Planning Phase (Desktop-First):**
- Researching destinations (lots of reading)
- Comparing prices (tables, multi-tab browsing)
- Reading reviews (detailed analysis)
- Booking (forms, payment details)
- Setting preferences (long forms)

**During Trip (Mobile-First):**
- Checking today's itinerary (quick glance)
- Finding nearby activities (GPS)
- Restaurant recommendations (location-based)
- Emergency contacts (quick access)
- Photo uploads (camera)
- Real-time updates (push notifications)

**Key Insight:** Different features need different platforms. Build web for planning, mobile for traveling.

### React Native + Expo Decision

**Why React Native:**
- ✅ Familiar React patterns (you already know React)
- ✅ Share 60-70% of code with web (types, API clients, business logic)
- ✅ One codebase → iOS + Android
- ✅ Good ecosystem (Expo, rn-primitives for shadcn-like UI)
- ✅ Hot reload for fast iteration
- ❌ Need to learn navigation, styling differences, native modules

**Why Expo:**
- ✅ Zero native configuration initially (no Xcode/Android Studio)
- ✅ Managed workflow = faster development
- ✅ Built-in modules (camera, location, push notifications)
- ✅ EAS for easy deployment
- ✅ OTA updates (fix bugs without app store review)
- ❌ Larger bundle size (~50-70MB base)
- ❌ Some native libraries require ejecting

**Alternative Considered:**
- Progressive Web App (PWA): Good for basic mobile, but no GPS, camera, or push notifications (iOS limitations)
- Flutter: Dart learning curve too steep, less code reuse with Next.js web

**Decision:** React Native + Expo for Phase 4 (after web MVP is validated)

### Web-First Strategy (Recommended)

**Phase 1-3: Web Only (Weeks 1-16)**

Build responsive Next.js web app:
- Works on mobile browsers (good enough for MVP)
- All features accessible (planning, booking, tracking)
- Fast to ship (no React Native learning curve)
- Easier to iterate (instant deployment)
- Validate concept before mobile investment

**Phase 4: Add Mobile App (Weeks 17-20)**

Build React Native app focused on during-trip features:
- Offline itinerary access
- GPS-based suggestions ("What's near me?")
- Push notifications (flight delays, reminders)
- Camera for photo uploads
- Emergency quick access
- Wallet integration (boarding passes, tickets)

**Why This Order:**

1. **Users plan at home on desktop** (research, compare, book)
2. **Users need mobile while traveling** (itinerary, GPS, emergencies)
3. **Validate before investing** - Know what mobile features users want
4. **Faster to revenue** - Web MVP in 8 weeks vs 16+ with React Native
5. **Learn in stages** - Master AI SDK + Amadeus before adding React Native

### Mobile vs Web Feature Split

**Web App Features:**
- ✅ AI trip generation (complex, needs large screen)
- ✅ Price comparison (tables, multiple tabs)
- ✅ Profile management (long forms)
- ✅ Itinerary editing (detailed)
- ✅ Booking via affiliate links (forms, payment)
- ✅ Admin dashboard (analytics)

**Mobile App Features:**
- ✅ View itinerary (read-only, optimized for glance)
- ✅ Offline access (download trip to device)
- ✅ GPS-based suggestions ("Near me" activities)
- ✅ Push notifications (flight status, activity reminders)
- ✅ Quick photo capture (for feedback, memories)
- ✅ Emergency contacts (one-tap call/text)
- ✅ Today's agenda (next 24 hours, card UI)
- ✅ Weather + local tips
- ✅ Wallet integration (boarding passes, activity tickets)

**Shared on Both:**
- ✅ Trip dashboard (upcoming trips, past trips)
- ✅ Booking tracker (where you booked, confirmation numbers)
- ✅ Feedback submission (ratings, reviews)
- ✅ Account settings (password, subscription)

### Code Sharing Architecture

**Monorepo Structure:**

```
tourgenie/
├── apps/
│   ├── web/                         # Next.js App Router
│   │   ├── app/
│   │   │   ├── (frontend)/
│   │   │   │   ├── trips/
│   │   │   │   ├── generate/       # AI trip generation (web-only)
│   │   │   │   └── profile/
│   │   │   └── api/
│   │   └── package.json
│   └── mobile/                      # React Native Expo
│       ├── app/                     # expo-router
│       │   ├── (tabs)/
│       │   │   ├── today.tsx        # Today's agenda (mobile-only)
│       │   │   ├── trips.tsx        # Trip list
│       │   │   └── profile.tsx
│       │   └── trip/[id].tsx
│       └── package.json
├── packages/
│   ├── ui/                          # Shared UI components
│   │   ├── TripCard.tsx            # 95% shared (small style tweaks)
│   │   ├── Button.tsx              # Uses rn-primitives for mobile
│   │   ├── Card.tsx
│   │   └── ActivityList.tsx
│   ├── api-client/                  # 100% shared
│   │   ├── trpc.ts                 # tRPC client
│   │   ├── hooks/
│   │   │   ├── useTrips.ts
│   │   │   └── useProfile.ts
│   │   └── index.ts
│   ├── types/                       # 100% shared
│   │   ├── trip.ts
│   │   ├── profile.ts
│   │   └── booking.ts
│   ├── amadeus/                     # 100% shared
│   │   ├── client.ts
│   │   └── types.ts
│   ├── auth/                        # 95% shared
│   │   ├── client.ts
│   │   ├── web.ts                  # Web-specific (cookies)
│   │   └── mobile.ts               # Mobile-specific (secure storage)
│   └── config/                      # 100% shared
│       └── constants.ts
└── services/
    └── backend/                     # PayloadCMS + API routes
        ├── src/
        │   ├── payload/
        │   └── server/
        └── package.json
```

**Code Reuse Examples:**

```typescript
// packages/types/trip.ts (100% shared)
export interface Trip {
  id: string
  destination: string
  dates: { start: Date; end: Date }
  itinerary: DayPlan[]
  budget: number
  bookings: Booking[]
}

// packages/api-client/hooks/useTrips.ts (100% shared)
export function useTrips() {
  return trpc.trips.list.useQuery()
}

export function useGenerateTrip() {
  return trpc.trips.generate.useMutation()
}

// packages/ui/TripCard.tsx (95% shared, conditional import)
import { Card, CardHeader, CardContent } from './primitives'

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <Card>
      <CardHeader>{trip.destination}</CardHeader>
      <CardContent>
        {trip.dates.start} - {trip.dates.end}
      </CardContent>
    </Card>
  )
}

// apps/web/app/(frontend)/trips/page.tsx (web-specific)
import { useTrips } from '@repo/api-client'
import { TripCard } from '@repo/ui'

export default function TripsPage() {
  const { data: trips } = useTrips()
  return trips?.map(trip => <TripCard key={trip.id} trip={trip} />)
}

// apps/mobile/app/(tabs)/trips.tsx (mobile-specific)
import { useTrips } from '@repo/api-client'
import { TripCard } from '@repo/ui'
import { ScrollView } from 'react-native'

export default function TripsScreen() {
  const { data: trips } = useTrips()
  return (
    <ScrollView>
      {trips?.map(trip => <TripCard key={trip.id} trip={trip} />)}
    </ScrollView>
  )
}
```

**Expected Code Reuse:**
- Types: 100% (identical across platforms)
- API clients: 100% (tRPC works everywhere)
- Business logic: 100% (pure functions)
- Hooks: 95% (platform-specific edge cases)
- UI components: 60-80% (layout differences)
- **Overall: 60-70% code reuse**

### Mobile-Only Features Implementation

**Offline Itinerary:**

```typescript
// apps/mobile/lib/offline.ts
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function downloadTrip(tripId: string) {
  const trip = await trpc.trips.getById.query({ id: tripId })
  await AsyncStorage.setItem(`trip:${tripId}`, JSON.stringify(trip))
}

export async function getOfflineTrip(tripId: string) {
  const cached = await AsyncStorage.getItem(`trip:${tripId}`)
  return cached ? JSON.parse(cached) : null
}
```

**GPS-Based Suggestions:**

```typescript
// apps/mobile/lib/location.ts
import * as Location from 'expo-location'

export async function getNearbyActivities(tripId: string) {
  const { coords } = await Location.getCurrentPositionAsync()
  const activities = await trpc.activities.nearby.query({
    tripId,
    lat: coords.latitude,
    lng: coords.longitude,
    radius: 5000, // 5km
  })
  return activities
}
```

**Push Notifications:**

```typescript
// apps/mobile/lib/notifications.ts
import * as Notifications from 'expo-notifications'

export async function scheduleTripReminders(trip: Trip) {
  // Day before flight
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Trip Tomorrow!',
      body: `Your flight to ${trip.destination} is tomorrow`,
    },
    trigger: {
      date: new Date(trip.dates.start.getTime() - 24 * 60 * 60 * 1000),
    },
  })

  // Activity reminders (2 hours before)
  for (const day of trip.itinerary) {
    for (const activity of day.activities) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: activity.name,
          body: `Starting in 2 hours`,
        },
        trigger: {
          date: new Date(activity.startTime.getTime() - 2 * 60 * 60 * 1000),
        },
      })
    }
  }
}
```

### Learning Path (React → React Native)

**What Transfers Directly:**
- ✅ React hooks (useState, useEffect, useContext)
- ✅ Component patterns (props, composition)
- ✅ TypeScript (same types, interfaces)
- ✅ State management (same patterns)
- ✅ API calls (tRPC, fetch)

**What's Different:**
- ❌ No DOM - `<View>`, `<Text>`, `<ScrollView>` instead of `<div>`, `<p>`
- ❌ No CSS - StyleSheet API, Flexbox-only (no Grid)
- ❌ Navigation - expo-router vs Next.js App Router
- ❌ Platform APIs - Location, Camera, Notifications (Expo modules)
- ❌ Performance - Optimize for 60fps, avoid large lists

**Estimated Learning Time:**
- Week 1: Basic React Native (View, Text, StyleSheet, navigation)
- Week 2: Expo modules (camera, location, notifications)
- Week 3: Platform-specific features (offline storage, push)
- Week 4: Polish + app store deployment

**Resources:**
- Expo docs (excellent for beginners)
- React Native docs (reference)
- rn-primitives (shadcn-like UI for React Native)
- expo-router (Next.js-like routing)

### Timeline Comparison

**Web-First (Recommended):**
- Week 1-8: Next.js MVP (AI trip builder, affiliate links, tracking)
- Week 9-10: Soft launch, user feedback
- Week 11-16: Iterate on web (price comparison, polish)
- Week 17-20: React Native mobile app (during-trip features)
- **Total**: 20 weeks to mobile app, validated concept after 10 weeks

**Mobile-First (Higher Risk):**
- Week 1-3: Learn React Native + Expo
- Week 4-12: Build mobile app (all features from scratch)
- Week 13-14: App store submissions + reviews
- Week 15-16: Bug fixes for different devices/OS versions
- Week 17-20: Web version (still need desktop for planning)
- **Total**: 20 weeks to both platforms, no validation until week 14

**Time Saved with Web-First:** 4-6 weeks faster to validation

### Mobile App Deployment

**App Store Submissions:**

1. **Apple App Store:**
   - Developer account ($99/year)
   - App review (1-5 days)
   - Requirements: Privacy policy, screenshots, description
   - EAS Build (Expo) handles provisioning

2. **Google Play Store:**
   - Developer account ($25 one-time)
   - Review (1-3 days)
   - Requirements: Content rating, privacy policy
   - EAS Build generates signed APK/AAB

**Continuous Deployment:**

```yaml
# .github/workflows/mobile-deploy.yml
name: Deploy Mobile App

on:
  push:
    branches: [main]
    paths:
      - 'apps/mobile/**'
      - 'packages/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3

      # Build and submit to stores
      - run: pnpm install
      - run: pnpm --filter mobile build
      - run: eas build --platform all --non-interactive
      - run: eas submit --platform all --non-interactive
```

**OTA Updates (Expo):**
- JS-only changes → instant updates (no app store review)
- Native changes → requires full app store submission
- Automatic updates on app open

### Recommendation Summary

**Build web MVP first** for these reasons:

1. ✅ **Validate concept faster** - 8 weeks to launch vs 16+ weeks
2. ✅ **Users plan on desktop** - Trip planning happens at home, on large screens
3. ✅ **Easier iteration** - Web deploys instantly, no app store gatekeepers
4. ✅ **Less risk** - Prove AI trip planner works before learning React Native
5. ✅ **Mobile later** - Add native app when you know what features users need

**Add mobile app in Phase 4** when:
- ✅ 50-100 users on web
- ✅ User feedback shows demand for offline/GPS/notifications
- ✅ Core product validated
- ✅ Revenue justifies 4-week mobile dev investment
- ✅ You have bandwidth to learn React Native

The web version will work great on mobile browsers for planning trips. The native app becomes valuable for **during trip** features (GPS, offline, notifications), which you can add once the core product is validated.

---

## Future Enhancements (Backlog)

### Stage 2+ Features

**Custom Domains (if needed for UIFoundry sync):**
- CNAME support for www.example.com
- DNS instructions
- SSL provisioning (AWS ACM)
- Domain verification

**Group Travel:**
- Multiple users collaborating on one trip
- Split payments
- Group chat
- Polls for decisions (where to go, what to do)

**Trip Templates:**
- Save itineraries as templates
- Share with friends
- Marketplace of user-created templates
- Monetize popular templates

**Advanced Personalization:**
- Music/movie/book recommendations (for trip vibes)
- Packing list generation (weather-based)
- Visa requirement checking
- Vaccination reminders
- Translation phrase guide

**Social Features:**
- Follow other travelers
- Share trip photos/reviews
- Trip inspiration feed
- Community Q&A for destinations

**Business Travel:**
- Expensing integration
- Company policy compliance
- Meeting scheduling around activities
- Loyalty program integration

---

## Technical Debt to Address

### Phase 1 → Phase 2

**Move from Railway to AWS:**
- Migrate Payload to ECS Fargate (always-on)
- Migrate API routes to Lambda (scale to zero)
- Add SQS for async operations (trip generation)
- Add Step Functions for workflows (domain verification)

**Add Caching:**
- Redis for Amadeus search results
- Cache affiliate link lookups
- Cache user profiles (read-heavy)

**Add Monitoring:**
- Error tracking (Sentry)
- Performance monitoring (New Relic / DataDog)
- User analytics (PostHog / Mixpanel)
- Uptime monitoring (Pingdom)

**Add Testing:**
- Unit tests (Jest)
- Integration tests (Playwright)
- End-to-end tests (critical flows)
- AI output validation tests

---

## Appendix: Code Snippets

### Amadeus Search Example

```typescript
import Amadeus from 'amadeus'

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
})

async function searchHotels(city: string, checkIn: string, checkOut: string) {
  try {
    const response = await amadeus.shopping.hotelOffers.get({
      cityCode: city,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adults: 2,
      radius: 50,
      radiusUnit: 'KM',
      ratings: '3,4,5',
      amenities: 'WIFI,PARKING',
      sort: 'PRICE',
    })

    return response.data
  } catch (error) {
    console.error('Amadeus search failed:', error)
    throw new Error('Failed to search hotels')
  }
}
```

### AI Trip Generation Example

```typescript
import { generateObject } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { z } from 'zod'

async function generateItinerary(
  prompt: string,
  profile: UserProfile,
  amadeusResults: AmadeusResults
) {
  const { object } = await generateObject({
    model: anthropic('claude-3-5-sonnet-20241022'),
    schema: z.object({
      selectedFlights: z.object({
        outbound: z.string(),
        return: z.string(),
        reasoning: z.string(),
      }),
      selectedHotels: z.array(z.object({
        hotelId: z.string(),
        nights: z.number(),
        reasoning: z.string(),
      })),
      dayByDay: z.array(z.object({
        day: z.number(),
        date: z.string(),
        activities: z.array(z.string()),
        meals: z.array(z.string()),
      })),
      budgetBreakdown: z.object({
        flights: z.number(),
        hotels: z.number(),
        activities: z.number(),
        food: z.number(),
      }),
    }),
    prompt: `Generate a trip itinerary based on:

User request: "${prompt}"

User profile:
- Style: ${profile.travelPreferences.style}
- Budget: $${profile.travelPreferences.typicalBudget.perDay}/day
- Interests: ${profile.travelPreferences.interests.map(i => i.category).join(', ')}
- Past trips: ${profile.tripHistory.totalTrips}
- What AI gets right: ${profile.aiAccuracyProfile.strengths.join(', ')}
- What AI gets wrong: ${profile.aiAccuracyProfile.weaknesses.join(', ')}

Available options:
${JSON.stringify(amadeusResults, null, 2)}

Instructions:
1. Select best options within budget
2. Match user's style and interests
3. Learn from past feedback
4. Explain your reasoning`,
  })

  return object
}
```

### Affiliate Link Generation

```typescript
function generateBookingComAffiliateLink(hotelId: string, dates: { checkIn: string, checkOut: string }) {
  const params = new URLSearchParams({
    aid: process.env.BOOKING_AFFILIATE_ID,
    hotel_id: hotelId,
    checkin: dates.checkIn,
    checkout: dates.checkOut,
    group_adults: '2',
  })

  return `https://www.booking.com/hotel/us/${hotelId}.html?${params.toString()}`
}

function generateViatorAffiliateLink(activityId: string) {
  return `https://www.viator.com/tours/${activityId}?pid=${process.env.VIATOR_AFFILIATE_ID}`
}
```

---

## Notes & Decisions Log

### October 30, 2025

**Decision:** Use Amadeus for search (not Duffel)
- Reason: Better global coverage, more results for hidden gems
- Trade-off: More complex API, longer integration time
- Impact: Product differentiation ("find unique destinations")

**Decision:** Start with affiliate model (not direct booking)
- Reason: No CS burden, faster to market, time to learn
- Trade-off: Lower control, dependent on platforms
- Impact: Can launch in 8-10 weeks vs 6+ months

**Decision:** Use Railway for MVP (not Lambda)
- Reason: Payload works perfectly, faster development
- Trade-off: Less auto-scaling, more expensive at scale
- Impact: Ship MVP in 8 weeks, migrate later if needed

**Decision:** Build user profiles with progressive enhancement
- Reason: Balance onboarding friction vs personalization
- Trade-off: Less data initially, improves over time
- Impact: 2-min onboarding, learns from each trip

**Decision:** Add pre-booking verification checklist
- Reason: Build trust before $4K purchase decision
- Trade-off: Extra step in booking flow
- Impact: 2-3x conversion rate increase expected

**Decision:** Three-stage feedback system
- Reason: Learn what works, improve AI over time
- Trade-off: User fatigue if over-surveyed
- Impact: AI improves 10-20% per quarter

**Decision:** Web-first, mobile later (React Native + Expo)
- Reason: Users plan trips on desktop, need mobile during travel
- Trade-off: Mobile features come 10+ weeks after web launch
- Impact: Ship in 8 weeks (web) vs 16+ weeks (mobile-first), validate before investing in React Native
- Mobile adds: Offline access, GPS suggestions, push notifications, camera
- Code reuse: 60-70% (types, API clients, business logic shared)
- Learning curve: 4 weeks to learn React Native (React knowledge transfers)

---

*End of Specification*
