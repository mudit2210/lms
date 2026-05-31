const fs = require('fs');

const filePath = 'c:\\Users\\DELL\\Desktop\\lmms\\src\\project\\admin\\Kms\\kms_home.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add handleUpdateTopic, handleDeleteTopic, handleDuplicateTopic handlers
const targetStateMarker = `  const handleUpdateLesson = (courseId, lessonId, updatedFields) => {
    setCoursesData(prev => prev.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          lessons: c.lessons.map(l => l.id === lessonId ? { ...l, ...updatedFields } : l)
        };
      }
      return c;
    }));
    logAuditAction('Update Lesson', \`Updated lesson ID: \${lessonId}\`);
  };`;

const replacementStateMarker = `  const handleUpdateLesson = (courseId, lessonId, updatedFields) => {
    setCoursesData(prev => prev.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          lessons: c.lessons.map(l => l.id === lessonId ? { ...l, ...updatedFields } : l)
        };
      }
      return c;
    }));
    logAuditAction('Update Lesson', \`Updated lesson ID: \${lessonId}\`);
  };

  const handleUpdateTopic = (courseId, lessonId, topicId, updatedFields) => {
    setCoursesData(prev => prev.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          lessons: c.lessons.map(l => {
            if (l.id === lessonId) {
              return {
                ...l,
                topics: l.topics.map(t => t.id === topicId ? { ...t, ...updatedFields } : t)
              };
            }
            return l;
          })
        };
      }
      return c;
    }));
    logAuditAction('Update Topic', \`Updated topic ID: \${topicId}\`);
  };

  const handleDeleteTopic = (courseId, lessonId, topicId) => {
    setCoursesData(prev => prev.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          lessons: c.lessons.map(l => {
            if (l.id === lessonId) {
              return {
                ...l,
                topics: l.topics.filter(t => t.id !== topicId)
              };
            }
            return l;
          })
        };
      }
      return c;
    }));
    setSelectedTopicId('');
    logAuditAction('Delete Topic', \`Deleted topic ID: \${topicId}\`);
  };

  const handleDuplicateTopic = (courseId, lessonId, topicId) => {
    const activeCourse = coursesData.find(c => c.id === courseId);
    if (!activeCourse) return;
    const activeLesson = activeCourse.lessons.find(l => l.id === lessonId);
    if (!activeLesson) return;
    const activeTopic = activeLesson.topics.find(t => t.id === topicId);
    if (!activeTopic) return;
    const duplicated = {
      ...activeTopic,
      id: \`TPC-\${Math.floor(500 + Math.random() * 9000)}\`,
      title: \`\${activeTopic.title} (Copy)\`,
      sequence: activeLesson.topics.length + 1
    };
    setCoursesData(prev => prev.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          lessons: c.lessons.map(l => {
            if (l.id === lessonId) {
              return {
                ...l,
                topics: [...l.topics, duplicated]
              };
            }
            return l;
          })
        };
      }
      return c;
    }));
    logAuditAction('Duplicate Topic', \`Duplicated topic ID: \${topicId}\`);
    alert("Topic duplicated successfully!");
  };`;

if (content.includes(targetStateMarker) && !content.includes('handleUpdateTopic')) {
  content = content.replace(targetStateMarker, replacementStateMarker);
  console.log("Topic handlers added.");
}

// 2. Pass handleUpdateTopic, handleDeleteTopic, handleDuplicateTopic as props to TopicManagement
const targetTopicMap = `                {coursesData.find(c => c.id === selectedCourseId)?.lessons.find(l => l.id === selectedLessonId) && (
                  <TopicManagement
                    activeLesson={coursesData.find(c => c.id === selectedCourseId)?.lessons.find(l => l.id === selectedLessonId)}
                    selectedTopicId={selectedTopicId}
                    setSelectedTopicId={(id) => {
                      setSelectedTopicId(id);
                      setEditingTopicContent(coursesData.find(c => c.id === selectedCourseId)?.lessons.find(l => l.id === selectedLessonId)?.topics.find(t => t.id === id)?.content || '');
                    }}
                    activeRole={activeRole}
                    handleAddTopic={() => handleAddTopic(selectedCourseId, selectedLessonId)}
                    handleOrderSequence={handleOrderSequenceAdapter}
                  />
                )}`;

const replacementTopicMap = `                {coursesData.find(c => c.id === selectedCourseId)?.lessons.find(l => l.id === selectedLessonId) && (
                  <TopicManagement
                    activeLesson={coursesData.find(c => c.id === selectedCourseId)?.lessons.find(l => l.id === selectedLessonId)}
                    selectedTopicId={selectedTopicId}
                    setSelectedTopicId={(id) => {
                      setSelectedTopicId(id);
                      setEditingTopicContent(coursesData.find(c => c.id === selectedCourseId)?.lessons.find(l => l.id === selectedLessonId)?.topics.find(t => t.id === id)?.content || '');
                    }}
                    activeRole={activeRole}
                    handleAddTopic={() => handleAddTopic(selectedCourseId, selectedLessonId)}
                    handleOrderSequence={handleOrderSequenceAdapter}
                    onUpdateTopic={handleUpdateTopic}
                    onDeleteTopic={handleDeleteTopic}
                    onDuplicateTopic={handleDuplicateTopic}
                    courseId={selectedCourseId}
                  />
                )}`;

if (content.includes(targetTopicMap)) {
  content = content.replace(targetTopicMap, replacementTopicMap);
  console.log("TopicManagement props updated.");
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("kms_home.jsx successfully updated with topics managers!");
