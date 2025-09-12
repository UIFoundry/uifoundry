import { describe, it, expect } from "vitest";
import { extractBlockDefaults } from "./extractBlockDefaults";
import type { Block } from "payload";

describe("extractBlockDefaults", () => {
  it("should extract default values from simple text fields", () => {
    const mockBlock = {
      slug: "test-block",
      fields: [
        {
          name: "title",
          type: "text",
          defaultValue: "Default Title",
        },
        {
          name: "description",
          type: "text",
          defaultValue: "Default Description",
        },
      ],
    } as Block;

    const result = extractBlockDefaults(mockBlock);

    expect(result).toEqual({
      title: "Default Title",
      description: "Default Description",
    });
  });

  it("should extract defaults from nested collapsible fields", () => {
    const mockBlock = {
      slug: "hero-block",
      fields: [
        {
          type: "collapsible",
          label: "Alert Section",
          fields: [
            {
              name: "alertLabel",
              type: "text",
              defaultValue: "New Update Available",
            },
            {
              name: "alertLink",
              type: "text",
              defaultValue: "/updates",
            },
          ],
        },
        {
          name: "mainTitle",
          type: "text",
          defaultValue: "Main Title",
        },
      ],
    } as Block;

    const result = extractBlockDefaults(mockBlock);

    expect(result).toEqual({
      alertLabel: "New Update Available",
      alertLink: "/updates",
      mainTitle: "Main Title",
    });
  });

  it("should handle fields returned by field functions", () => {
    // Mock a field function similar to headerField()
    const headerField = () => ({
      name: "header",
      type: "text",
      defaultValue: "Header Default Value",
    });

    const mockBlock = {
      slug: "block-with-function-field",
      fields: [
        headerField(),
        {
          name: "directField",
          type: "text",
          defaultValue: "Direct Default",
        },
      ],
    } as Block;

    const result = extractBlockDefaults(mockBlock);

    expect(result).toEqual({
      header: "Header Default Value",
      directField: "Direct Default",
    });
  });

  it("should ignore fields without names or default values", () => {
    const mockBlock = {
      slug: "sparse-block",
      fields: [
        {
          name: "hasDefault",
          type: "text",
          defaultValue: "Has Default",
        },
        {
          name: "noDefault",
          type: "text",
          // no defaultValue
        },
        {
          type: "collapsible",
          label: "No Name Field",
          fields: [
            {
              name: "nestedWithDefault",
              type: "text",
              defaultValue: "Nested Default",
            },
          ],
        },
      ],
    } as Block;

    const result = extractBlockDefaults(mockBlock);

    expect(result).toEqual({
      hasDefault: "Has Default",
      nestedWithDefault: "Nested Default",
    });
  });

  it("should handle deeply nested field structures", () => {
    const mockBlock = {
      slug: "deep-nested-block",
      fields: [
        {
          type: "collapsible",
          label: "Level 1",
          fields: [
            {
              name: "level1Field",
              type: "text",
              defaultValue: "Level 1 Default",
            },
            {
              type: "collapsible",
              label: "Level 2",
              fields: [
                {
                  name: "level2Field",
                  type: "text",
                  defaultValue: "Level 2 Default",
                },
              ],
            },
          ],
        },
      ],
    } as Block;

    const result = extractBlockDefaults(mockBlock);

    expect(result).toEqual({
      level1Field: "Level 1 Default",
      level2Field: "Level 2 Default",
    });
  });

  it("should return empty object for block with no fields", () => {
    const mockBlock = {
      slug: "empty-block",
      fields: [],
    } as Block;

    const result = extractBlockDefaults(mockBlock);

    expect(result).toEqual({});
  });

  it("should return empty object for block with undefined fields", () => {
    const mockBlock = {
      slug: "undefined-fields-block",
      // fields property undefined
    } as Block;

    const result = extractBlockDefaults(mockBlock);

    expect(result).toEqual({});
  });
});
