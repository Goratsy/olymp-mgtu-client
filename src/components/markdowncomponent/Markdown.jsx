import { Box } from '@mui/material';
import React from 'react'
import Markdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {prism} from 'react-syntax-highlighter/dist/esm/styles/prism'
// import './markdown.css'

function MarkdownComponent(props) {
    const markdown = props.children;
    console.log('MarkdownComponent')
    return(
    <Markdown
        children={markdown}
        style={{ fontFamily: 'Roboto, sans-serif' }}
        components={{
        code(props) {
            const {children, className, node, ...rest} = props
            const match = /language-(\w+)/.exec(className || '')
            console.log(className, rest);
            return match ? (
            <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={prism}
            />
            ) : (
                <code {...rest} className={className} style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {children}
                </code>
            )
        }
        }}
    />
    
    )
}
export default MarkdownComponent;