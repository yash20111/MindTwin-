import type { FaqItem } from "@/content/copy";
import { faq as faqCopy } from "@/content/copy";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd, faqLd } from "@/components/seo/json-ld";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="card px-6 md:px-8">
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`item-${i}`}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function FAQ({
  items = faqCopy.items,
  title = faqCopy.title,
  eyebrow = faqCopy.eyebrow,
}: {
  items?: FaqItem[];
  title?: string;
  eyebrow?: string;
}) {
  return (
    <section aria-labelledby="faq-title" className="py-24 md:py-32">
      <div className="container-page max-w-3xl">
        <SectionHeading id="faq-title" eyebrow={eyebrow} title={title} />
        <Reveal className="mt-12">
          <FaqList items={items} />
        </Reveal>
        <JsonLd data={faqLd(items)} />
      </div>
    </section>
  );
}
