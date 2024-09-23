# Giphy Search App

## :books: Table of Contents

- [:sparkles: Tech Stack](#sparkles-tech-stack)
- [:wrench: Setup Instructions](#wrench-setup-instructions)
- [:crystal_ball: Future Considerations](#crystal_ball-future-considerations)

## :sparkles: Tech Stack

The Giphy Search App utilizes the following technologies:

- [Next.js](https://nextjs.org): A React framework for server-side rendering and static site generation.
- [TypeScript](https://www.typescriptlang.org/): A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [Tailwind CSS](https://tailwindcss.com): A utility-first CSS framework for rapid UI development.
- [tRPC](https://trpc.io): End-to-end typesafe APIs made easy.

This tech stack was chosen because it contains production ready tools that reinforces industry standard practices across engineering teams while being able to rapidly prototype and provide an intuitive learning curve. There are many other stacks that could be used in its place.

## :wrench: Setup Instructions

To get started with the Giphy Search App, follow these steps:

1. **Clone the repository**:

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the necessary environment variables. Refer to the `.env.example` file for the required variables.

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Visit `http://localhost:3000` to see the application in action.

## :crystal_ball: Future Considerations

- Create a Minimal Viable Brand for the application and create design system tokens so that tailwind can be easily configured.
- [Vercel](https://create.t3.gg/en/deployment/vercel) - since we are not looking to grow at scale, we can make the most of free tier deployments for now. So I would look at deploying the demo.
- Add [AuthJS](https://authjs.dev/) and [Prisma](https://www.prisma.io/) - this would add a lot of value, since user data could allow for the application to support more advanced features and user experiences.
- Add [Playwright](https://playwright.dev/) tests - this will allow us to create some automated tests for low hanging fruits to sustain roll out of new pages and features in our app.
- Choose a component library to standardise the application's look and feel. I have personally had great success with [Mantine](https://mantine.dev/) or [Material UI](https://mui.com/).
