import type { Block } from "payload";

import { describe, expect, it } from "vitest";

import { extractBlockDefaults } from "./extractBlockDefaults";

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
      description: "Default Description",
      title: "Default Title",
    });
  });

  it("should extract defaults from nested collapsible fields", () => {
    const mockBlock = {
      slug: "hero-block",
      fields: [
        {
          type: "collapsible",
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
          label: "Alert Section",
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
      directField: "Direct Default",
      header: "Header Default Value",
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
          fields: [
            {
              name: "nestedWithDefault",
              type: "text",
              defaultValue: "Nested Default",
            },
          ],
          label: "No Name Field",
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
          fields: [
            {
              name: "level1Field",
              type: "text",
              defaultValue: "Level 1 Default",
            },
            {
              type: "collapsible",
              fields: [
                {
                  name: "level2Field",
                  type: "text",
                  defaultValue: "Level 2 Default",
                },
              ],
              label: "Level 2",
            },
          ],
          label: "Level 1",
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
