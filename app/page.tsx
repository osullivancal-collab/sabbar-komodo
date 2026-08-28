"use client";

import Image from "next/image";
import { useForm, ValidationError } from "@formspree/react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Compass,
  Leaf,
  MapPin,
  ShieldCheck,
  ShipWheel,
  Sun,
  Users,
  Waves,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const journey = [
  {
    day: "01",
    route: "Kelor to Kalong",
    text: "Board in Labuan Bajo, then ease into island time with a Kelor trek, clear-water snorkelling and the fruit bat migration at sunset.",
  },
  {
    day: "02",
    route: "Rinca to Padar",
    text: "Meet Komodo dragons with a guided trek, cruise to Pink Beach, then climb Padar as the evening light moves across the bays.",
  },
  {
    day: "03",
    route: "Mantas & sandbars",
    text: "Swim at Taka Makassar, snorkel Manta Point or Siaba Besar, and finish with beach time at Angel Island before returning.",
  },
];

const inclusions = [
  "Airport or hotel transfers",
  "Air-conditioned cabins",
  "All meals, snacks and soft drinks",
  "Snorkelling equipment",
  "Towels and basic toiletries",
  "Guided island, trek and sea excursions",
  "Professional crew and cruise director",
];

export default function Home() {
  const [formState, handleFormSubmit] = useForm("xyeyyzze");

  return (
    <main>
      <section className="hero" id="top">
        <Image
          src="/images/sabbar-hero.jpg"
          alt="Sabbar liveaboard sailing in Komodo waters"
          fill
          priority
          unoptimized
          className="hero-image"
          sizes="100vw"
        />
        <div className="hero-shade" />

        <header className="site-header shell">
          <a className="wordmark" href="#top" aria-label="Sabbar home">
            <span>SABBAR</span>
            <small>LIVEABOARD</small>
          </a>
          <nav aria-label="Main navigation">
            <a href="#journey">Journey</a>
            <a href="#vessel">The vessel</a>
            <a href="#enquire" className="nav-cta">
              Enquire <ArrowUpRight />
            </a>
          </nav>
        </header>

        <div className="hero-copy shell">
          <p className="eyebrow light"><MapPin /> Labuan Bajo · Komodo National Park</p>
          <h1>Leave the shore.<br />Find the wild.</h1>
          <p className="hero-intro">
            A customisable liveaboard through Komodo: hidden beaches, volcanic
            ridgelines, manta water and quiet nights at sea—shaped around your
            group.
          </p>
          <div className="hero-actions">
            <Button asChild className="primary-cta">
              <a href="#enquire">Plan your escape <ArrowUpRight /></a>
            </Button>
            <a className="text-link light-link" href="#journey">
              Explore the route <ArrowDown />
            </a>
          </div>
        </div>

        <div className="hero-facts shell" aria-label="Trip overview">
          <div><span>03</span><small>Days</small></div>
          <div><span>02</span><small>Nights</small></div>
          <div><span>08</span><small>Private guests</small></div>
          <div><span>03</span><small>Cabins</small></div>
        </div>
      </section>

      <section className="intro-section section-pad">
        <div className="shell intro-grid">
          <p className="section-kicker">The Sabbar way</p>
          <div>
            <h2>A slower way into Komodo.</h2>
            <p className="lead-copy">
              Not a hotel with an ocean view. Your room moves with the islands.
              Sabbar brings a small group closer to the places that make Komodo
              unforgettable—and gives you enough time to actually feel them.
            </p>
            <p className="experience-copy">
              Days move between guided treks, snorkelling, beach time and long
              stretches on deck. Meals are prepared aboard, equipment is ready,
              and the crew handles the moving parts so your group can settle
              into the rhythm of the islands.
            </p>
          </div>
        </div>

        <div className="shell landscape-card">
          <Image
            src="/images/komodo-bay.jpg"
            alt="A turquoise bay among the Komodo islands"
            fill
            unoptimized
            className="cover-image"
            sizes="(max-width: 900px) 92vw, 1200px"
          />
          <div className="landscape-note">
            <Compass />
            <span>Sea days shaped by weather,<br />wildlife and the light.</span>
          </div>
        </div>
      </section>

      <section className="journey-section section-pad" id="journey">
        <div className="shell section-heading-row">
          <div>
            <p className="section-kicker coral">Sample itinerary</p>
            <h2>Three days.<br />No ordinary moments.</h2>
          </div>
          <p>
            This is a starting point, not a fixed schedule. Private charters can
            be shaped around what your group wants more of.
          </p>
        </div>

        <div className="shell custom-route-note">
          <div>
            <span>Customise your private trip</span>
            <strong>More water. More beach. More time.</strong>
          </div>
          <p>
            Tell us if your group prefers snorkelling, trekking, quiet
            anchorages, extra beach time or a slower pace. The crew will shape
            the route where park access, weather, sea conditions and safety
            allow.
          </p>
        </div>

        <div className="shell journey-list">
          {journey.map((item) => (
            <article className="journey-row" key={item.day}>
              <span className="day-number">DAY {item.day}</span>
              <h3>{item.route}</h3>
              <p>{item.text}</p>
              <ArrowUpRight aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="shell padar-image">
          <Image
            src="/images/padar-sunset.jpg"
            alt="Padar Island ridges and sheltered bays at sunset"
            fill
            unoptimized
            className="cover-image"
            sizes="(max-width: 900px) 92vw, 1200px"
          />
          <span>Padar, at golden hour</span>
        </div>
      </section>

      <section className="vessel-section section-pad" id="vessel">
        <div className="shell vessel-grid">
          <div className="vessel-copy">
            <p className="section-kicker">About Sabbar</p>
            <h2>Built by the coast. Made for these waters.</h2>
            <p>
              Crafted in Banyuwangi, East Java, Sabbar carries the region&apos;s
              boatbuilding tradition into an intimate modern liveaboard. Solar
              panels support the electrical systems, helping each journey make
              more conscious use of energy at sea.
            </p>
            <div className="feature-grid">
              <div><Users /><span>Up to 8 guests</span></div>
              <div><Sun /><span>Open sunset deck</span></div>
              <div><Leaf /><span>Solar-supported power</span></div>
              <div><ShieldCheck /><span>Updated safety equipment</span></div>
            </div>
          </div>
          <div className="deck-photo">
            <Image
              src="/images/sabbar-deck.jpg"
              alt="Open deck aboard Sabbar"
              fill
              unoptimized
              className="cover-image"
              sizes="(max-width: 900px) 92vw, 52vw"
            />
          </div>
        </div>

        <div className="shell cabin-grid">
          <div className="cabin-gallery">
            <div className="cabin-shot cabin-shot-main">
              <Image
                src="/images/cabin-twin.jpg"
                alt="Sabbar's air-conditioned twin cabin"
                fill
                unoptimized
                className="cover-image"
                sizes="(max-width: 900px) 92vw, 56vw"
              />
              <span>Twin cabin · 2–4 guests</span>
            </div>
            <div className="cabin-shot">
              <Image
                src="/images/cabin-queen-portholes.jpg"
                alt="Sabbar queen cabin with sunset through the portholes"
                fill
                unoptimized
                className="cover-image"
                sizes="(max-width: 620px) 46vw, 28vw"
              />
              <span>Queen cabin · 2 guests</span>
            </div>
            <div className="cabin-shot">
              <Image
                src="/images/cabin-queen.jpg"
                alt="Sabbar air-conditioned queen cabin"
                fill
                unoptimized
                className="cover-image"
                sizes="(max-width: 620px) 46vw, 28vw"
              />
              <span>Queen cabin · 2 guests</span>
            </div>
          </div>
          <div className="cabin-copy">
            <span className="cabin-index">03 cabins</span>
            <h3>Simple, cool and comfortable below deck.</h3>
            <p>
              Air-conditioned lower-deck accommodation with queen and twin
              configurations, towels, storage and a shared bathroom. Warm
              timber, cool air and proper beds make the cabins a comfortable
              place to recharge between island days.
            </p>
          </div>
        </div>
      </section>

      <section className="details-section section-pad">
        <div className="shell details-grid">
          <div>
            <p className="section-kicker coral">What&apos;s included</p>
            <h2>Arrive ready.<br />We handle the rest.</h2>
          </div>
          <div className="inclusion-list">
            {inclusions.map((item) => (
              <div key={item}><Check /> <span>{item}</span></div>
            ))}
          </div>
        </div>

        <div className="shell rates-grid">
          <article className="rate-card rate-featured">
            <div>
              <span>Private charter</span>
              <strong>Rp 20,000,000</strong>
              <small>per day · maximum 8 guests</small>
            </div>
            <ShipWheel />
          </article>
          <article className="rate-card">
            <div>
              <span>Open trip</span>
              <strong>Rp 6,000,000</strong>
              <small>per person · 3 days / 2 nights</small>
            </div>
            <Waves />
          </article>
        </div>
        <p className="shell exclusion-note">
          Flights, Labuan Bajo hotels, Komodo Park fees, alcohol, travel
          insurance and crew gratuities are not included.
        </p>
      </section>

      <section className="enquiry-section section-pad" id="enquire">
        <div className="shell enquiry-grid">
          <div className="enquiry-copy">
            <p className="section-kicker coral">Charter enquiry</p>
            <h2>Trade the itinerary for a horizon.</h2>
            <p>
              Tell us who is travelling, roughly when, and what your group
              wants more of. We&apos;ll help shape a customisable Sabbar journey
              from Labuan Bajo.
            </p>
            <div className="boarding-note">
              <span>Typical departure</span>
              <strong>11:00 AM</strong>
              <small>All guests aboard by 10:30 AM</small>
            </div>
          </div>

          {formState.succeeded ? (
            <div className="enquiry-form enquiry-success" role="status">
              <span className="success-icon"><Check /></span>
              <p className="section-kicker coral">Enquiry received</p>
              <h3>Thank you. We&apos;ll be in touch.</h3>
              <p>
                Your Sabbar enquiry has been sent. We&apos;ll review your group,
                dates and trip preferences and reply with the next steps.
              </p>
              <Button asChild className="form-submit">
                <a href="#top">Return to the journey <ArrowUpRight /></a>
              </Button>
            </div>
          ) : (
          <form className="enquiry-form" onSubmit={handleFormSubmit}>
            <input type="hidden" name="_subject" value="New Sabbar charter enquiry" />
            <div className="form-row">
              <label>
                <span>Your name</span>
                <Input name="name" required placeholder="Full name" />
              </label>
              <label>
                <span>Email</span>
                <Input name="email" type="email" required placeholder="you@email.com" />
                <ValidationError
                  field="email"
                  prefix="Email"
                  errors={formState.errors}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                <span>WhatsApp</span>
                <Input name="whatsapp" type="tel" placeholder="Include country code" />
              </label>
              <label>
                <span>Guests</span>
                <Input name="guests" type="number" min="1" max="8" required placeholder="2" />
              </label>
            </div>
            <div className="form-row">
              <label>
                <span>Trip type</span>
                <Select name="trip_type" defaultValue="private">
                  <SelectTrigger className="form-select" aria-label="Trip type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private charter · custom route</SelectItem>
                    <SelectItem value="open">Open trip</SelectItem>
                    <SelectItem value="unsure">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </label>
              <label>
                <span>Preferred dates</span>
                <Input name="dates" placeholder="e.g. 12–15 September" />
              </label>
            </div>
            <label>
              <span>Anything we should know?</span>
              <Textarea
                name="message"
                rows={4}
                required
                placeholder="Tell us about your group, timing or the kind of trip you want."
              />
              <ValidationError
                field="message"
                prefix="Message"
                errors={formState.errors}
              />
            </label>
            <Button type="submit" className="form-submit" disabled={formState.submitting}>
              {formState.submitting ? "Sending enquiry…" : "Send charter enquiry"}
              {!formState.submitting && <ArrowUpRight />}
            </Button>
            <p className="form-helper">
              Your details are used only to respond to this charter enquiry.
            </p>
          </form>
          )}
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <div className="wordmark dark-mark">
            <span>SABBAR</span>
            <small>LIVEABOARD</small>
          </div>
          <p>Snorkelling · Trekking · Beach time · Sunset</p>
          <a href="#top">Back to top <ArrowUpRight /></a>
        </div>
      </footer>
    </main>
  );
}
