import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="page-container py-16 md:py-24">
      <div className="content-block">
        <ScrollAnimation>
          <h1 className="heading-xl mb-4">Contact</h1>
          <p className="body-text text-muted mb-12 max-w-[65ch]">
            The Institute does not maintain a public office. Correspondence may be directed to
            the following channels. Responses are not guaranteed.
          </p>
        </ScrollAnimation>

        <div className="space-y-6 max-w-[500px]">
          <div className="flex items-start gap-4 py-4 border-b border-border">
            <Mail size={16} className="text-muted mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium mb-1">Email</p>
              <a
                href="mailto:hello@notstudying.network"
                className="text-sm text-muted hover:text-foreground transition-colors duration-300 underline-animate"
              >
                hello@notstudying.network
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 py-4 border-b border-border">
            <div className="w-4 shrink-0" />
            <div>
              <p className="text-sm font-medium mb-1">Postal</p>
              <p className="text-sm text-muted">
                Institute of Not Studying Network Society
                <br />
                General Delivery
                <br />
                Shanghai, China
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="body-small text-muted italic">
            Unsolicited manuscripts, collaboration proposals, and conference CFP submissions
            will not be read or acknowledged.
          </p>
        </div>
      </div>
    </div>
  );
}
