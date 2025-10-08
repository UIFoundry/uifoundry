# Agent OS Documentation System

This directory contains the foundational knowledge and procedures for maintaining UIFoundry's component documentation system.

## 🚨 CRITICAL FOR ALL AGENTS

**Every agent working with UIFoundry registry components MUST read and follow these guidelines.**

### Quick Start for New Agents

1. **Adding Components**: Read `instructions/core/maintain-documentation-system.md` FIRST
2. **Documentation Template**: Use `standards/documentation-template.md` for all new docs
3. **Dependency Mapping**: Check `standards/registry-mapping.md` for existing mappings
4. **Quality Control**: Follow `instructions/core/component-documentation-checklist.md`

### System Files Overview

```
.agent-os/
├── standards/                          # Documentation standards
│   ├── documentation-template.md       # 5-section template (Preview, Props, Installation, Registry Deps, NPM Deps)
│   └── registry-mapping.md            # Component → docs path mappings & descriptions
├── instructions/core/                  # Core procedures
│   ├── maintain-documentation-system.md  # ⚠️ READ THIS FIRST - Auto-update protocol
│   ├── component-documentation-checklist.md  # Quality checklist for all docs
│   └── update-component-docs.md        # Procedures for updating existing docs
└── README.md                          # This file
```

## 🔄 Self-Maintaining System

This documentation system is designed to be **self-maintaining** when agents follow the protocols:

- **Add Component** → **Update Mappings** → **System Stays Current**
- **Skip Updates** → **System Breaks** → **Future Agents Confused**

### The Documentation Lifecycle

1. **Developer adds component** to `registry.json`
2. **Agent creates documentation** following 5-section template
3. **Agent updates mapping files** with new dependencies
4. **Future agents** can auto-generate docs for similar components
5. **System scales** without manual intervention

## 🎯 Goals Achieved

- ✅ **Consistency**: All components follow identical 5-section structure
- ✅ **Automation**: Dependency mapping enables auto-generation
- ✅ **Scalability**: System grows with new components automatically
- ✅ **Quality**: Checklists ensure no component is missed
- ✅ **Maintenance**: Clear protocols prevent documentation drift

## ⚠️ Common Pitfalls to Avoid

- **Don't skip mapping updates** - breaks auto-generation for future components
- **Don't create custom documentation structures** - breaks consistency
- **Don't add components without documentation** - creates technical debt
- **Don't ignore the checklist** - leads to incomplete documentation

## 🧠 Agent Memory

This system serves as the "institutional memory" for UIFoundry's documentation standards. Each file contains specific knowledge that prevents agents from having to rediscover best practices or recreate documentation patterns.

**When in doubt, refer to these files. When adding new patterns, update these files.**

---

_This system is only as strong as the agents who maintain it. Thank you for keeping UIFoundry's documentation excellent! 🚀_
