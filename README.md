# Dotcom Logic

Dotcom-logic (DCL) is a proposal for a new service. It is designed to be the backend to dotcom-rendering (DCR). If DCR needs to make an additional api call after the page has already loaded, this server should receive that call

## Why build DCL?

### Structure

DCL is designed to be the place where logic happens, instead of on the client. This has the advatage of creating a simpler separation of concerns with the client code being more focussed on presentation and less on business logic.

### Sharing

Another benefit to building a service oriented api is that is can be reused by other rendering stacks. The app rendering team in particular could see efficiencies.

### Speed

The team working on DCR are mainly javascript engineers. There is limited knowledge of Scala so those people who do know Scala become bottlenecks when api changes are required. By building out DCL in typecript changes can be made by the whole team, speeding up delivery.

## What does DCL do?

This table gives the current level of coverage vs. DCR. If an item is shown as supported by DCR that means the page makes a call to `frontend` directly. If '-' is shown it is proposed to add this service to DCL.
| | DCL? | DCR? |
|--------------:|:----:|:----:|
| Comment count | - | N |
| Most read | N | Y |
| Most popular | N | Y |
| Onwards | Y | N |
| Share count | N | Y |
| Rich links | N | Y |
| Contributions | - | N |

## Where does DCL fit in?

Initially, DCL is a layer over the existing `frontend` service which provides an api over `CAPI`. The call stack looks like:

```
Browser (DCR) -> DCL -> Frontend -> CAPI
```

In future, as DCR grows, this stack could be simplified to

```
Browser (DCR) -> DCL -> CAPI
```

with `DCL` calling `CAPI` directly

_[If this proposal is adopted, this README should be be updated to replace this proposal text with usage and api docs.]_
