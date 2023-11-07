import React from 'react'

const TrendingTags = ({ tags, handleTagClick }: { tags: string[], handleTagClick: (tag: string) => void }) => {
  return (
    <div className='px-3 flex-center flex-col sm:flex-row space-x-2 mt-2'>
        <span className='font-satoshi text-gray-700 text-sm'>{`What's trending?`}</span>
        <span className='flex-wrap space-x-1 mt-2 sm:mt-0'>
      {tags.map((tag, i) => (
        <span key={i} className='tag' onClick={() => handleTagClick(tag)}>
          {tag}
        </span>
      ))}
      </span>
    </div>
  )
}

export default TrendingTags
