/**
 * Per-integration SEO/GEO overrides keyed by integration slug, authored from the
 * SEO team's on-site recommendations. Consumed at render time by the integration
 * page (`integrations/(shell)/[slug]/page.tsx`): both `generateMetadata` (title,
 * description, keywords) and the page body (H1, hero tagline, overview prose, and
 * the triggers/templates/tools section intros).
 *
 * This is NOT baked into `integrations.json` and never touches
 * `scripts/generate-docs.ts`; it augments the generated catalog purely at render
 * time. Any slug absent here renders the generated defaults unchanged. Has no app
 * runtime imports beyond the type, so it stays a cheap, reviewable data source.
 */

import type { IntegrationSeoContent } from '@/app/(landing)/integrations/data/types'

export const INTEGRATION_SEO: Record<string, IntegrationSeoContent> = {
  github: {
    title: 'GitHub Workflow Automation | Ame',
    description:
      'Build GitHub automation in Ame. Use GitHub workflow automation for pull requests, pushes, issues, and releases with AI agents.',
    keywords: ['github automation', 'github workflow automation', 'github integration'],
    h1: 'GitHub Workflow Automation and Integration',
    tagline: 'Build GitHub automation and trigger AI workflows from GitHub events.',
    overview:
      'Use Ame’s GitHub integration to run GitHub automation inside one AI workspace. Get pull request details, post pull request and issue comments, fetch repository and commit data, and trigger workflows from pull requests, comments, pushes, releases, and GitHub Actions events. Build GitHub workflow automation for code reviews, changelog generation, engineering digests, release operations, and documentation updates.',
    triggersIntro:
      'Connect a GitHub webhook to Ame and your agent runs the instant an event happens, no polling, no delay.',
  },
  outlook: {
    title: 'Outlook Automation with Ame',
    description:
      'Build Outlook automation in Ame. Send, draft, route, and manage emails with AI agents using Outlook integration.',
    keywords: ['outlook automation', 'outlook integration'],
    h1: 'Outlook Automation and Integration',
    tagline: 'Build Outlook automation for inboxes, drafts, replies, and email workflows.',
    overview:
      'Integrate Outlook into your workflow and run Outlook automation inside Ame. Send, read, draft, forward, and move email messages, or trigger workflows when new emails arrive. This Outlook integration helps teams automate inbox operations, email routing, follow-ups, and agent-driven communication from one AI workspace.',
    toolsSubtitleSuffix:
      '. Use Ame with Outlook to power Outlook automation for sending, reading, drafting, forwarding, organizing, and triggering email workflows',
  },
  box: {
    title: 'Box Workflow Automation | Box Automation with Ame',
    description:
      'Build Box workflow automation in Ame. Run Box automation for files, folders, search, and Box Sign with AI agents. Free to start.',
    keywords: ['box workflow automation', 'box automation', 'box integration'],
    h1: 'Box Integrations for Workflow Automation',
    tagline: 'Build Box workflow automation for files, folders, and e-signatures.',
    overview:
      'Use Ame’s workflow builder to run Box automation in one AI workspace. This Box integration lets you upload and download files, search content, create folders, send documents for e-signature, track signing status, and connect Box to the rest of your stack with AI agents.',
  },
  slack: {
    title: 'Slack Workflow Automation with Ame',
    description:
      'Build Slack workflow automation in Ame. Send messages, manage channels, and trigger agents with real-time Slack integration.',
    keywords: [
      'slack workflow builder',
      'slack automation',
      'slack workflow automation',
      'slack integration',
    ],
    h1: 'Slack Integrations for Workflow Automation',
    tagline:
      'Build Slack workflow automation in Ame. Send, update, delete, and read messages; manage channels, users, canvases, and modals; and trigger AI agents from mentions, messages, and reactions in real time.',
    overview:
      'Use Ame as your Slack integration for team communication and operations. Build Slack automation that routes requests, posts alerts, summarises threads, updates tickets, and keeps work moving. Ame supports messages, reactions, canvases, views, channel and user lookups, file downloads, and real-time Slack workflows in one workspace.',
    triggersIntro:
      'Connect the Slack Webhook trigger to Ame and run Slack workflow automation the moment a mention, message, or reaction happens, no polling, no delay.',
    templatesIntro:
      'Ready-to-use Slack automation templates for Q&A bots, sales alerts, incident response, standups, digests, and CRM updates. Click any template to launch a workflow faster.',
  },
  airtable: {
    title: 'Airtable Automation with Ame',
    description:
      'Build Airtable workflow automation in Ame. Sync records and run an Airtable integration with AI agents.',
    keywords: ['airtable automation', 'airtable workflow automation', 'airtable ai integration'],
    h1: 'Airtable Workflow Automation and AI Integration',
    tagline: 'Build Airtable automation for records, schema, syncs, and workflow triggers.',
    overview:
      'Use this Airtable integration to run Airtable workflow automation in Ame. List bases and tables, inspect schema, read records, create new rows, update one or many records, and launch workflows when Airtable data changes.',
    triggersIntro:
      'Connect Airtable webhooks to Ame and launch Airtable workflow automation when records are created, updated, or deleted. Pass changed fields into AI agents for enrichment, routing, validation, or notifications.',
    templatesIntro:
      'Start from Airtable automation templates for data sync, enrichment, reporting, and record-driven workflows.',
  },
  pipedrive: {
    title: 'Pipedrive Workflow Automation with Ame',
    description:
      'Build Pipedrive workflow automation in Ame. Run Pipedrive automation for deals, leads, activities, and pipelines.',
    keywords: [
      'pipedrive workflow automation',
      'pipedrive automation',
      'pipedrive integration',
      'pipedrive crm integration',
    ],
    h1: 'Pipedrive Workflow Automation',
    tagline:
      'Build Pipedrive CRM workflow automation for deals, leads, pipelines, activities, files, and mail threads in Ame’s workspace.',
    overview:
      'Use Ame for Pipedrive workflow automation across deals, contacts, leads, sales pipeline stages, projects, activities, files, and communications with powerful CRM capabilities. This Pipedrive integration helps sales teams route leads, update CRM records, trigger follow-ups, and keep pipeline data in sync from one AI workspace.',
    toolsSubtitleSuffix:
      '. Use Ame with Pipedrive for deals, leads, activities, projects, pipelines, files, and mail threads, from creating deals and leads to updating activities, retrieving files, and tracking pipeline progress',
  },
  confluence: {
    title: 'Confluence Workflow Automation with Ame',
    description:
      'Build Confluence workflow automation in Ame. Read, update and trigger pages, comments, spaces and knowledge flows.',
    keywords: ['confluence automation', 'confluence workflow automation'],
    h1: 'Confluence Workflow Automation',
    tagline:
      'Build Confluence automation for pages, comments, attachments, labels and knowledge workflows with AI agents.',
    overview:
      'Integrate Confluence into the workflow with Ame and run Confluence automation across your knowledge base. Read, create, update and delete pages, manage comments, attachments, labels and spaces, search content, and trigger downstream actions the moment Confluence changes.',
    triggersIntro:
      'Connect a Confluence webhook to Ame to start workflows and your agent runs the instant an event happens, no polling, no delay.',
    templatesIntro:
      'Ready-to-use templates for Confluence knowledge workflows. Click any template to build it instantly.',
    toolsSubtitleSuffix:
      ' for Confluence automation across pages, blog posts, comments, attachments, labels, spaces, tasks and users',
  },
  jira: {
    title: 'Jira Automation with Ame',
    description:
      'Build Jira automation in Ame. Create, update, assign, and transition issues with AI agents and real-time triggers.',
    keywords: ['jira automation', 'jira integration'],
    h1: 'Jira Automation with Ame',
    tagline:
      'Build Jira automation for issues, comments, worklogs, and status changes with AI agents and real-time triggers.',
    overview:
      'Integrate Jira into Ame’s workflow and run Jira automation to create, update, assign, and transition issues, search with JQL, manage comments and attachments, and trigger workflows from Jira webhook events. Ame and Jira integration helps teams automate project updates, sprint reporting, triage, and issue routing in one AI workspace.',
    triggersIntro:
      'Connect Jira webhooks to Ame and your agent runs the instant an event, comments, worklogs, sprints, projects, or releases change, no polling, no delay.',
  },
  salesforce: {
    title: 'Salesforce CRM Automation with Ame',
    description:
      'Automate Salesforce CRM with AI agents in Ame. Streamline workflows, sync data, and trigger actions automatically.',
    keywords: ['salesforce automation', 'salesforce workflow automation', 'salesforce integration'],
    h1: 'Salesforce CRM Automation',
    tagline: 'Interact with Salesforce CRM or trigger workflows from Salesforce events.',
    overview:
      'Integrate Salesforce CRM into your workflow. Automate your CRM by managing accounts, contacts, leads, opportunities, cases, and tasks, all with powerful workflow automation. Use Ame’s AI agents to keep your Salesforce data in sync, automate follow-ups, and eliminate manual CRM work.',
    triggersIntro:
      'Connect a Salesforce webhook to Ame and your agent runs the instant an event happens, no polling, no delay. For example, trigger a workflow when a new Salesforce record is created or an opportunity stage changes, and let Ame handle the automation immediately.',
  },
  hubspot: {
    title: 'HubSpot CRM Automation with Ame',
    description:
      'Build HubSpot automation workflows in Ame. Automate CRM updates, triggers, and follow-ups with AI agents. Free to start.',
    keywords: [
      'hubspot automation',
      'hubspot workflow',
      'hubspot automation workflows',
      'hubspot integration',
    ],
    h1: 'HubSpot CRM Automation',
    tagline: 'Build HubSpot automation workflows with AI agents in Ame.',
    overview:
      'Integrate HubSpot into your workflow and run HubSpot automation inside Ame. Create, update, and manage CRM records, or trigger agents and workflows from HubSpot events. This HubSpot integration helps teams automate follow-ups, sync CRM data, and build faster HubSpot automation workflows from one AI workspace.',
    triggersIntro:
      'Connect a HubSpot webhook to Ame and trigger workflows the moment CRM activity happens. Run agents when records are created or updated, then automate routing, enrichment, follow-ups, and downstream actions without manual work.',
  },
  notion: {
    title: 'Notion Automation with Ame',
    description:
      'Build Notion automation workflows in Ame. Create, update, and manage Notion pages with AI agents.',
    keywords: ['notion automation', 'notion workflow automation', 'notion integration'],
    h1: 'Notion Automation with Ame',
    tagline: 'Build Notion workflow automation with AI agents in Ame.',
    overview:
      'Integrate Notion into your workflow and run Notion automation inside Ame. Create, update, and manage Notion pages with AI agents, or connect Notion to larger workflows across your stack. This Notion integration helps teams organize knowledge, automate page updates, and build faster Notion workflow automation from one AI workspace.',
  },
  supabase: {
    title: 'Supabase Automation with Ame',
    description:
      'Build Supabase automation in Ame. Connect your database to AI workflows and automate Supabase actions. Free to start.',
    keywords: ['supabase automation', 'supabase integration'],
    h1: 'Supabase Automation',
    tagline: 'Build Supabase automation with AI agents in Ame.',
    overview:
      'Integrate Supabase into your workflow and run Supabase automation inside Ame. Connect your database to AI agents, trigger workflows from app activity, and automate data operations across your stack. This Supabase integration helps teams move faster by connecting backend data, workflows, and AI in one workspace.',
  },
  linkedin: {
    title: 'LinkedIn Automation with Ame',
    description:
      'Build LinkedIn automation workflows in Ame. Share posts, manage your presence, and connect LinkedIn to AI agents. Free to start.',
    keywords: [
      'linkedin automation',
      'linkedin workflow',
      'linkedin workflow automation',
      'linkedin integration',
    ],
    h1: 'LinkedIn Automation',
    tagline: 'Build LinkedIn workflow automation with AI agents in Ame.',
    overview:
      'Integrate LinkedIn into your workflows and run LinkedIn automation inside Ame. Share posts to your personal feed, access LinkedIn profile information, and connect LinkedIn to the rest of your AI workspace. This LinkedIn integration helps teams manage their LinkedIn presence, publish content faster, and build repeatable LinkedIn workflows without manual posting.',
  },
  attio: {
    title: 'Attio Automation with Ame',
    description:
      'Build Attio automation in Ame. Manage CRM records, notes, tasks, lists, comments, and webhooks with AI agents. Free to start.',
    keywords: ['attio automation', 'attio integration'],
    h1: 'Attio Automation',
    tagline:
      'Build Attio automation with AI agents in Ame. Manage records, notes, tasks, lists, comments, and more in Attio CRM.',
    overview:
      'Connect Attio to Ame and run Attio automation across your CRM workflows. Manage records, notes, tasks, lists, list entries, comments, workspace members, and webhooks from one AI workspace. This Attio integration helps teams automate CRM updates, trigger agents from Attio events, and connect customer data to the rest of their go-to-market stack.',
  },
  lemlist: {
    title: 'Lemlist Automation with Ame',
    description:
      'Build Lemlist automation in Ame. Manage outreach activities, leads, replies, and emails with AI agents. Free to start.',
    keywords: ['lemlist automation', 'lemlist integration'],
    h1: 'Lemlist Automation',
    tagline:
      'Build Lemlist automation with AI agents in Ame. Manage outreach activities, leads, replies, and emails through Lemlist.',
    overview:
      'Integrate Lemlist into your workflow and run Lemlist automation inside Ame. Retrieve campaign activities and replies, get lead information, and send emails through the Lemlist inbox. This Lemlist integration helps teams automate outreach workflows, track lead engagement, respond to campaign activity, and connect Lemlist to the rest of their sales and marketing stack.',
  },
  linear: {
    title: 'Linear Automation with Ame',
    description:
      'Build Linear automation in Ame. Manage issues, projects, cycles, comments, and product workflows with AI agents. Free to start.',
    keywords: ['linear automation', 'linear workflow'],
    h1: 'Linear Automation',
    tagline:
      'Build Linear automation with AI agents in Ame. Manage issues, projects, cycles, comments, and product workflows.',
    overview:
      'Integrate Linear into your workflow and run Linear automation inside Ame. Manage issues, comments, projects, labels, workflow states, cycles, attachments, customers, and more from one AI workspace. This Linear workflow setup helps product and engineering teams automate bug triage, issue creation, project updates, sprint reporting, and cross-tool workflows triggered by Linear events.',
  },
  apollo: {
    title: 'Apollo CRM Automation with Ame',
    description:
      'Build Apollo CRM automation in Ame. Search, enrich, manage contacts, and run Apollo.io workflows with AI agents. Free to start.',
    keywords: [
      'apollo crm integration',
      'apollo crm automation',
      'apollo io workflow',
      'apollo io automation',
    ],
    h1: 'Apollo CRM Automation',
    tagline:
      'Build Apollo.io automation with AI agents in Ame. Search, enrich, and manage contacts, accounts, opportunities, and sales workflows.',
    overview:
      'Integrate Apollo into your workflow and run Apollo CRM automation inside Ame. Search for people and companies, enrich contact and account data, manage CRM contacts and accounts, add contacts to sequences, create tasks, and update opportunities from one AI workspace. This Apollo CRM integration helps sales and growth teams automate prospecting, lead enrichment, contact management, and outbound workflows without manual CRM work.',
  },
  datadog: {
    title: 'Datadog Automation with Ame',
    description:
      'Build Datadog workflow automation in Ame. Monitor apps, logs, metrics, incidents, and alerts with AI agents. Free to start.',
    keywords: ['datadog workflow automation', 'datadog automation'],
    h1: 'Datadog Automation',
    tagline:
      'Build Datadog workflow automation in Ame. Monitor apps, logs, metrics, incidents, and alerts with AI agents.',
    overview:
      'Integrate Datadog into your workflow and run Datadog automation inside Ame. Monitor infrastructure, applications, logs, metrics, incidents, dashboards, and alerts from one AI workspace. This Datadog integration helps engineering and operations teams automate observability workflows, investigate issues faster, route incidents, summarize alerts, and connect monitoring data to the rest of their stack.',
  },
}
