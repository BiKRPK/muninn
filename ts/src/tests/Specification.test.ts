// import { Ability } from "../logic/Ability";
// import { Agent } from "../logic/Agent";
// import { Side, Site, ContentType } from "../logic/Enums";
// import { Scene } from "../logic/Scene";
// import { SceneSpecification, AgentSpecification, SideSpecification, SiteSpecification, AbilitySpecification, ContentTypeSpecification, UserSpecification, AndSpecification, OrSpecification, NotSpecification, FavoriteSpecification } from "../logic/Specification";
// import { getoverwolfIDFromName } from "../logic/TypeUtils";
// import { Video } from "../logic/Video";

// // Mocks para tus tipos de datos
// const scene: Scene = Scene.getInstance("Haven", getoverwolfIDFromName("Haven"));
// const agent: Agent = Agent.getInstance("Jett", getoverwolfIDFromName("Jett"));
// const abilities: Ability[] = [Ability.getInstance("Q"  , getAbilityName(agent, "Q")) as Ability];

// const fakeVideo: Video = new Video (
//     "123",
//     "fakeVideo",
//     scene,
//     agent,
//     abilities,
//     Side.Attack,
//     Site.A,
//     ContentType.LineUp,
//     "fakeVideo",
//     false,
//     "fakeVideo",
// );

// describe('Specification Tests', () => {
//     it('should satisfy MapSpecification', () => {
//         const mapSpec = new SceneSpecification(scene);
//         expect(mapSpec.isSatisfiedBy(fakeVideo)).toBe(true);
//     });

//     it('should satisfy AgentSpecification', () => {
//         const agentSpec = new AgentSpecification(agent);
//         expect(agentSpec.isSatisfiedBy(fakeVideo)).toBe(true);
//     });

//     it('should satisfy SideSpecification', () => {
//         const sideSpec = new SideSpecification([Side.Attack]);
//         expect(sideSpec.isSatisfiedBy(fakeVideo)).toBe(true);
//     });

//     it('should satisfy SiteSpecification', () => {
//         const siteSpec = new SiteSpecification([Site.A]);
//         expect(siteSpec.isSatisfiedBy(fakeVideo)).toBe(true);
//     });

//     it('should satisfy AbilitySpecification', () => {
//         const abilitySpec = new AbilitySpecification([{ name: "Updraft", key: "Q" }]);
//         expect(abilitySpec.isSatisfiedBy(fakeVideo)).toBe(true);
//     });

//     it('should satisfy ContentTypeSpecification', () => {
//         const contentTypeSpec = new ContentTypeSpecification([ContentType.LineUp]);
//         expect(contentTypeSpec.isSatisfiedBy(fakeVideo)).toBe(true);
//     });

//     it('should satisfy UserSpecification', () => {
//         const userVideo = { ...fakeVideo, isFromUser: true };
//         const userSpec = new UserSpecification();
//         expect(userSpec.isSatisfiedBy(userVideo)).toBe(true);
//     });

//     it('should satisfy AndSpecification', () => {
//         const mapSpec = new SceneSpecification({ overwolfID: "Haven" });
//         const agentSpec = new AgentSpecification({ overwolfID: "Jett" });
//         const andSpec = new AndSpecification(mapSpec, agentSpec);
//         expect(andSpec.isSatisfiedBy(fakeVideo)).toBe(true);
//     });

//     it('should satisfy OrSpecification', () => {
//         const mapSpec = new SceneSpecification({ overwolfID: "Haven" });
//         const agentSpec = new AgentSpecification({ overwolfID: "Phoenix" });
//         const orSpec = new OrSpecification(mapSpec, agentSpec);
//         expect(orSpec.isSatisfiedBy(fakeVideo)).toBe(true);
//     });

//     it('should satisfy NotSpecification', () => {
//         const mapSpec = new SceneSpecification({ overwolfID: "Bind" });
//         const notSpec = new NotSpecification(mapSpec);
//         expect(notSpec.isSatisfiedBy(fakeVideo)).toBe(true);
//     });

//     it('should satisfy FavoriteSpecification', () => {
//         jest.mock('./FrontFunctions', () => ({
//             isFav: jest.fn().mockReturnValue(true),
//         }));
//         const favSpec = new FavoriteSpecification();
//         expect(favSpec.isSatisfiedBy(fakeVideo)).toBe(true);
//     });
// });
