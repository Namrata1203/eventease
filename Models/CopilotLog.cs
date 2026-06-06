namespace eventease.Models;

public class CopilotLog
{
    public string Id { get; set; } = "";
    public string Stage { get; set; } = "";
    public string TaskTitle { get; set; } = "";
    public string Challenge { get; set; } = "";
    public string PromptUsed { get; set; } = "";
    public string AssistanceReceived { get; set; } = "";
    public string OutcomeAndValue { get; set; } = "";
}
