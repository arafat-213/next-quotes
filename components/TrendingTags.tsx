import React from 'react'

const TrendingTags = ({ tags, handleTagClick }: { tags: string[], handleTagClick: (tag: string) => void }) => {
  return (
    <div className='space-x-2 mt-2'>
        <span className='font-satoshi text-gray-700 text-sm'>{`What's trending?`}</span>
      {tags.map((tag, i) => (
        <span key={i} className='tag' onClick={() => handleTagClick(tag)}>
          {tag}
        </span>
      ))}
    </div>
  )
}

export default TrendingTags
