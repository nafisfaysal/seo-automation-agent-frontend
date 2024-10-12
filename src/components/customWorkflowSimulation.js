import { mockData } from '../mockData'; // Assuming you have your mock data in a separate file

const simulateStep = (step, delay) => new Promise(resolve => setTimeout(() => resolve(step), delay));

export async function runCustomWorkflow(workflowSteps, updateProgress) {
  const results = {};
  for (let i = 0; i < workflowSteps.length; i++) {
    const step = await simulateStep(workflowSteps[i], 2000); // 2 seconds delay for each step
    updateProgress(i + 1, workflowSteps.length, step.label, step.description);
    
    // Here you would normally process the data for each step
    // For now, we'll just use mock data
    const key = step.label.toLowerCase().replace(/\s+/g, '');
    results[key] = mockData[key] || {}; // Fallback to empty object if no mock data
  }
  return { results, steps: workflowSteps };
}
