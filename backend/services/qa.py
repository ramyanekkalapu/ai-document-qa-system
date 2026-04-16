def answer_question(vector_store, question: str) -> str:
    docs = vector_store.similarity_search(question, k=3)
    if not docs:
        return "I could not find relevant information in the uploaded document."

    context = "\n\n".join(doc.page_content for doc in docs)
    return (
        "Retrieved relevant context from the document:\n\n"
        f"{context[:1500]}"
    )
