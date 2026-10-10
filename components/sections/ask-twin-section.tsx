import { askTwin } from "@/content/copy";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { AskTwinDemo } from "@/components/demos/ask-twin-demo";

export function AskTwinSection() {
  return (
    <section
      id="ask"
      aria-labelledby="ask-title"
      className="relative overflow-x-clip py-24 md:py-32"
    >
      <div
        aria-hidden
        className="bg-twin/12 pointer-events-none absolute top-1/3 left-1/2 h-[480px] w-[720px] max-w-full -translate-x-1/2 rounded-full blur-[100px]"
      />
      <div className="container-page relative">
        <SectionHeading
          id="ask-title"
          eyebrow={askTwin.eyebrow}
          title={askTwin.title}
          sub={askTwin.sub}
        />
        <Reveal className="mt-12">
          <AskTwinDemo />
        </Reveal>
      </div>
    </section>
  );
}
