const mediumToMarkdown = require('medium-to-markdown');
const request = require('request');
const JSON = require('JSON');
const { promises: fs } = require('fs')
const path = require('path')

const mediumApiUrl = `https://v1.nocodeapi.com/nightvision/medium/RygUaJjhDpXXHVZu`;

// function that takes a title and returns a slug
const slugify = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
};

const getPosts = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) {
                reject(error);
            }
            resolve(JSON.parse(body));
        });
    });
}

const main = async () => {
    const posts = [];
    try {
        console.log('Fetching posts from Medium...');
        const response = await getPosts(mediumApiUrl);
        posts.push(...response);
        console.log(`Fetched ${posts.length} posts from Medium.`);
    } catch (error) {
        console.log(error);
    }

    console.log('Generating markdown files...');

    try {
        await Promise.all(posts.map(async (post) => {
            const markdown = await mediumToMarkdown.convertFromUrl(post.link);

            const slug = slugify(post.title);

            // remove lines to Follow
            const lines = markdown.split('Follow\n')[1];

            const content = `---
title: ${post.title}
date: ${new Date(post.created).toISOString().split('T')[0]}
description: ${post.title}
tag: ${post.category.map((tag) => tag).join(', ')}
author: ${post.author}
---

Read this post on [Medium](${post.link}).
${lines}
`;
            console.log(`Generating markdown file for ${post.title}...`);
            await fs.writeFile(path.join(__dirname, '..', 'pages', 'posts', slug + '.md'), content);
        }));
    } catch (error) {
        console.log(error);
    }

    console.log('Done!');
}

main();