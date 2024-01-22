"use client";
import { Link, RichTextEditor } from "@mantine/tiptap";
import "@mantine/tiptap/styles.css";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FaPencilAlt } from "react-icons/fa";
import classes from "./styles/editor.module.css";

export default function Editor() {
  const content = `<h2 style="text-align: center;">Welcome to Cre8ive 4mula</h2>
<p>At [Your Design Studio Name], we bring your creative visions to life with exceptional design services. Our team specializes in crafting bespoke solutions for a diverse range of clients, including artists, content creators, and businesses seeking to make a lasting impression. Our services include:</p>
<ul>
  <li><strong>Brand Identity:</strong> Creating impactful and memorable branding that resonates with your target audience.</li>
  <li><strong>Web and Digital Design:</strong> Designing stunning, user-friendly websites and digital experiences that engage and convert.</li>
  <li><strong>Print and Packaging:</strong> Delivering innovative print and packaging designs that stand out on the shelves.</li>
  <li><strong>Illustration and Graphics:</strong> Crafting unique illustrations and graphics tailored to your specific needs.</li>
  <li><strong>Custom Projects:</strong> Collaborating closely with you to bring any custom design project to fruition.</li>
</ul>
<p>Our approach is centered around understanding your unique needs and delivering designs that not only look great but also effectively communicate your message. Explore our <a href="[Link to Portfolio]" target="_blank" rel="noopener noreferrer">portfolio</a> to see our work in action, or <a href="[Link to Contact Page]" target="_blank" rel="noopener noreferrer">contact us</a> today to discuss how we can help elevate your brand.</p>
`;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  return (
    <RichTextEditor
      classNames={{
        root: classes.editorRoot,
        toolbar: classes.editorToolbar,
        content: classes.editorContent,
        controlsGroup: classes.editorControlsGroup,
      }}
      editor={editor}
    >
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup ml={10} c={"#fff"}>
          <FaPencilAlt size={25} />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
